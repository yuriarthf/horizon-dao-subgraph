import { Bytes, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";

import {
  CashBack as CashBackEvent,
  Commit as CommitEvent,
  CreateIRO as CreateIROEvent,
  FundsWithdrawn as FundsWithdrawnEvent,
  OwnerTokensClaimed as OwnerTokensClaimedEvent,
  RealEstateCreated as RealEstateCreatedEvent,
  TokensClaimed as TokensClaimedEvent,
  InitialRealEstateOffering as InitialRealEstateOfferingContract,
} from "../generated/InitialRealEstateOffering/InitialRealEstateOffering";

import { ERC20 as ERC20Contract } from "../generated/InitialRealEstateOffering/ERC20";
import { IROSet, IRO, UserShare } from "../generated/schema";

enum Status {
  PENDING,
  ONGOING,
  SUCCESS,
  FAIL,
}

const IRO_SET_ID = Bytes.fromBigInt(new BigInt(0));

function normalizeRatio(iroContract: InitialRealEstateOfferingContract, num: number): BigDecimal {
  return new BigDecimal(new BigInt(num)).div(new BigDecimal(new BigInt(iroContract.DENOMINATOR())));
}

function getStatus(iro: IRO, timestamp: BigInt): Status {
  if (iro.start.gt(timestamp)) return Status.PENDING;
  if (iro.end.gt(timestamp)) {
    if (iro.totalFunding.equals(iro.totalFunding)) return Status.SUCCESS;
    return Status.ONGOING;
  }
  if (iro.end.le(timestamp)) {
    if (iro.softCap.gt(iro.totalFunding)) return Status.FAIL;
    return Status.SUCCESS;
  }
  return Status.FAIL;
}

export function handleCashBack(event: CashBackEvent): void {
  const iro = IRO.load(Bytes.fromBigInt(event.params._iroId));

  let shareIds = iro.shares;
  const userShares = shareIds.map((shareId) => UserShare.load(shareId));

  const userShare = userShares.at(userShares.findIndex((share) => share.address === event.params._by));

  userShare.claimed = true;
  userShare.save();
}

export function handleCommit(event: CommitEvent): void {
  const iro = IRO.load(Bytes.fromBigInt(event.params._iroId));

  iro.totalFunding = iro.totalFunding.plus(event.params._value);

  let shareIds = iro.shares;
  const userShareId = iro.id.concatI32(event.params._user.toI32());
  const iroContract = InitialRealEstateOfferingContract.bind(event.address);
  const userShareBPS = normalizeRatio(
    iroContract,
    iroContract.userAmountAndShare(event.params._iroId, event.params._user).value1,
  );
  if (!shareIds) {
    const userShare = new UserShare(userShareId);
    userShare.address = event.params._user;
    userShare.commitedFunds = event.params._value;
    userShare.amount = event.params._purchasedAmount;
    userShare.share = userShareBPS;
    userShare.claimed = false;
    userShare.save();
    shareIds = [userShare.id];
  } else {
    if (!shareIds.includes(userShareId)) {
      const userShare = new UserShare(userShareId);
      userShare.address = event.params._user;
      userShare.commitedFunds = event.params._value;
      userShare.amount = event.params._purchasedAmount;
      userShare.share = userShareBPS;
      userShare.claimed = false;
      userShare.save();
      shareIds.push(userShare.id);
    } else {
      const userShare = UserShare.load(shareIds.at(shareIds.findIndex((shareId) => shareId === userShareId)));
      userShare.commitedFunds = userShare.commitedFunds.plus(event.params._value);
      userShare.amount = userShare.amount.plus(event.params._purchasedAmount);
      userShare.share = userShareBPS;
      userShare.save();
    }
  }
  iro.save();
}

export function handleCreateIRO(event: CreateIROEvent): void {
  const iro = new IRO(Bytes.fromBigInt(event.params._iroId));
  const iroContract = InitialRealEstateOfferingContract.bind(event.address);

  iro.iroId = event.params._iroId;
  iro.status = Status[iroContract.getStatus(iro.iroId)];
  iro.listingOwner = event.params._listingOwner;
  iro.unitPrice = event.params._unitPrice;
  iro.listingOwnerShare = normalizeRatio(iroContract, event.params._listingOwnerShare);
  iro.treasuryFee = normalizeRatio(iroContract, event.params._treasuryFee);
  iro.reservesFee = normalizeRatio(iroContract, event.params._reservesFee);
  iro.currency = Bytes.fromHexString(event.params._currency.toHexString());
  iro.currencyDecimals = new BigInt(ERC20Contract.bind(event.params._currency).decimals());

  // get IRO info from IRO contract
  const iroInfo = iroContract.getIRO(event.params._iroId);
  iro.softCap = iroInfo.softCap;
  iro.hardCap = iroInfo.hardCap;
  iro.start = event.params._start;
  iro.end = event.params._end;
  iro.totalFunding = iroInfo.totalFunding;
  iro.fundsWithdrawn = false;
  iro.ownerClaimed = false;
  iro.save();

  // update IROSet
  const iroSet = IROSet.load(IRO_SET_ID);
  const entityIds = iroSet.entityIds;
  const iroIds = iroSet.iroIds;
  entityIds.push(iro.id);
  iroIds.push(iro.iroId);
  iroSet.entityIds = entityIds;
  iroSet.iroIds = iroIds;
  iroSet.save();
}

export function handleFundsWithdrawn(event: FundsWithdrawnEvent): void {
  const iro = IRO.load(Bytes.fromBigInt(event.params._iroId));

  iro.fundsWithdrawn = true;
  iro.save();
}

export function handleOwnerTokensClaimed(event: OwnerTokensClaimedEvent): void {
  const iro = IRO.load(Bytes.fromBigInt(event.params._iroId));

  iro.ownerClaimed = true;
  iro.save();
}

export function handleRealEstateCreated(event: RealEstateCreatedEvent): void {
  const iro = IRO.load(Bytes.fromBigInt(event.params._iroId));

  iro.iroId = event.params._realEstateId;
  iro.save();
}

export function handleTokensClaimed(event: TokensClaimedEvent): void {
  const iro = IRO.load(Bytes.fromBigInt(event.params._iroId));

  const userShare = UserShare.load(iro.id.concatI32(event.params._by.toI32()));
  userShare.claimed = true;
  userShare.save();
}

export function handleBlock(block: ethereum.Block): void {
  let iroSet = IROSet.load(IRO_SET_ID);
  if (!iroSet) {
    iroSet = new IROSet(IRO_SET_ID);
    iroSet.save();
  } else {
    iroSet.entityIds.forEach((entityId) => {
      const iro = IRO.load(entityId);
      if ([Status[Status.PENDING], Status[Status.ONGOING]].includes(iro.status)) {
        const status = Status[getStatus(iro, block.timestamp)];
        if (iro.status !== status) {
          iro.status = status;
          iro.save();
        }
      }
    });
  }
}
