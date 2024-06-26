import { Bytes, BigDecimal, BigInt, ethereum, Address } from "@graphprotocol/graph-ts";

import {
  CashBack as CashBackEvent,
  Commit as CommitEvent,
  CreateIRO as CreateIROEvent,
  FundsWithdrawn as FundsWithdrawnEvent,
  RealEstateCreated as RealEstateCreatedEvent,
  TokensClaimed as TokensClaimedEvent,
  InitialRealEstateOffering as InitialRealEstateOfferingContract,
} from "../generated/InitialRealEstateOffering/InitialRealEstateOffering";

import { ERC20 as ERC20Contract } from "../generated/InitialRealEstateOffering/ERC20";
import { IROSet, IRO, UserShare } from "../generated/schema";

const IRO_SET_ID = Bytes.fromByteArray(Bytes.fromBigInt(new BigInt(0)));

function normalizeRatio(num: number, den: number): BigDecimal {
  return BigInt.fromU64(<u64>num).divDecimal(new BigDecimal(BigInt.fromU64(<u64>den)));
}

function getStatus(iro: IRO, timestamp: BigInt): string {
  if (iro.start.gt(timestamp)) return "PENDING";
  if (iro.end.gt(timestamp)) {
    if (iro.totalFunding.equals(iro.targetFunding)) return "SUCCESS";
    return "FUNDING";
  }
  if (iro.end.le(timestamp)) {
    if (iro.targetFunding.gt(iro.totalFunding)) return "FAIL";
    return "SUCCESS";
  }
  return "FAIL";
}

export function handleCashBack(event: CashBackEvent): void {
  const iro = IRO.load(Bytes.fromByteArray(Bytes.fromBigInt(event.params._iroId)));

  let shareIds = iro!.shares!;
  const userShares = shareIds.map<UserShare>((shareId) => UserShare.load(shareId)!);
  for (let i = 0; i < userShares.length; i++) {
    if (Address.fromBytes(userShares[i].address).equals(event.params._by)) {
      const userShare = userShares[i];
      userShare.claimed = true;
      userShare.save();
      break;
    }
  }
}

export function handleCommit(event: CommitEvent): void {
  const iro = IRO.load(Bytes.fromByteArray(Bytes.fromBigInt(event.params._iroId)))!;

  iro.totalFunding = iro.totalFunding.plus(event.params._value);
  const userShareId = iro.id.concat(Bytes.fromHexString(event.params._user.toHexString()));
  const iroContract = InitialRealEstateOfferingContract.bind(event.address);
  const denominator = iroContract.DENOMINATOR();
  if (!iro.shares) {
    const userShare = new UserShare(userShareId);
    const userShareBPS = normalizeRatio(
      iroContract.userAmountAndShare(event.params._iroId, event.params._user).value1,
      denominator,
    );
    userShare.address = Bytes.fromHexString(event.params._user.toHexString());
    userShare.committedFunds = event.params._value;
    userShare.amount = event.params._purchasedAmount;
    userShare.share = userShareBPS;
    userShare.claimed = false;
    userShare.save();
    iro.shares = [userShare.id];
  } else {
    if (!iro.shares!.includes(userShareId)) {
      const userShare = new UserShare(userShareId);
      const userShareBPS = normalizeRatio(
        iroContract.userAmountAndShare(event.params._iroId, event.params._user).value1,
        denominator,
      );
      userShare.address = Bytes.fromHexString(event.params._user.toHexString());
      userShare.committedFunds = event.params._value;
      userShare.amount = event.params._purchasedAmount;
      userShare.share = userShareBPS;
      userShare.claimed = false;
      userShare.save();
      const userShareIds = iro.shares!;
      for (let i = 0; i < userShareIds.length; i++) {
        const userShare = UserShare.load(userShareIds[i])!;
        const userShareBPS = normalizeRatio(
          iroContract.userAmountAndShare(event.params._iroId, Address.fromBytes(userShare.address)).value1,
          denominator,
        );
        userShare.share = userShareBPS;
        userShare.save();
      }
      userShareIds.push(userShareId);
      iro.shares = userShareIds;
    } else {
      const userShareIds = iro.shares!;
      for (let i = 0; i < userShareIds.length; i++) {
        const userShare = UserShare.load(userShareIds[i])!;
        const userShareBPS = normalizeRatio(
          iroContract.userAmountAndShare(event.params._iroId, Address.fromBytes(userShare.address)).value1,
          denominator,
        );
        userShare.share = userShareBPS;
        if (userShareIds[i].equals(userShareId)) {
          userShare.committedFunds = userShare.committedFunds.plus(event.params._value);
          userShare.amount = userShare.amount.plus(event.params._purchasedAmount);
        }
        userShare.save();
      }
    }
  }
  iro.save();
}

export function handleCreateIRO(event: CreateIROEvent): void {
  const iro = new IRO(Bytes.fromByteArray(Bytes.fromBigInt(event.params._iroId)));
  const iroContract = InitialRealEstateOfferingContract.bind(event.address);
  //const denominator = iroContract.DENOMINATOR();
  iro.iroId = event.params._iroId;

  // get IRO info from IRO contract
  const iroInfo = iroContract.getIRO(event.params._iroId);
  iro.listingOwner = iroInfo.listingOwner;
  iro.start = iroInfo.start;
  iro.end = iroInfo.end;
  iro.currency = Bytes.fromHexString(iroInfo.currency.toHexString());
  iro.treasuryFee = iroInfo.treasuryFee;
  iro.operationFee = iroInfo.operationFee;
  iro.targetFunding = iroInfo.targetFunding;
  iro.unitPrice = iroInfo.unitPrice;
  iro.totalFunding = iroInfo.totalFunding;
  iro.fundsWithdrawn = false;
  iro.status = getStatus(iro, event.block.timestamp);

  const currencyDecimals = ERC20Contract.bind(iroInfo.currency).decimals();
  iro.currencyDecimals = BigInt.fromU32(<u32>currencyDecimals);

  iro.save();

  // update IROSet
  const iroSet = IROSet.load(IRO_SET_ID)!;
  let entityIds = iroSet.entityIds;
  let iroIds = iroSet.iroIds;
  if (!entityIds || !iroIds) {
    entityIds = [iro.id];
    iroIds = [iro.iroId];
  } else {
    entityIds.push(iro.id);
    iroIds.push(iro.iroId);
  }
  iroSet.entityIds = entityIds;
  iroSet.iroIds = iroIds;
  iroSet.save();
}

export function handleFundsWithdrawn(event: FundsWithdrawnEvent): void {
  const iro = IRO.load(Bytes.fromByteArray(Bytes.fromBigInt(event.params._iroId)))!;

  iro.fundsWithdrawn = true;
  iro.save();
}

export function handleRealEstateCreated(event: RealEstateCreatedEvent): void {
  const iro = IRO.load(Bytes.fromByteArray(Bytes.fromBigInt(event.params._iroId)))!;

  iro.iroId = event.params._realEstateId;
  iro.save();
}

export function handleTokensClaimed(event: TokensClaimedEvent): void {
  const iro = IRO.load(Bytes.fromByteArray(Bytes.fromBigInt(event.params._iroId)))!;

  const userShare = UserShare.load(iro.id.concat(Bytes.fromHexString(event.params._by.toHexString())))!;
  userShare.claimed = true;
  userShare.save();
}

export function handleBlock(block: ethereum.Block): void {
  let iroSet = IROSet.load(IRO_SET_ID);
  if (!iroSet) {
    iroSet = new IROSet(IRO_SET_ID);
    iroSet.save();
  } else {
    const entityIds = iroSet.entityIds;
    if (!entityIds) return;
    for (let i = 0; i < entityIds.length; i++) {
      const iro = IRO.load(entityIds[i])!;
      if (["PENDING", "FUNDING"].includes(iro.status)) {
        const status = getStatus(iro, block.timestamp);
        if (iro.status !== status) {
          iro.status = status;
          iro.save();
        }
      }
    }
  }
}
