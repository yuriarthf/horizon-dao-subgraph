import { Bytes, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  CashBack as CashBackEvent,
  Commit as CommitEvent,
  CreateIRO as CreateIROEvent,
  FundsWithdrawn as FundsWithdrawnEvent,
  Initialized as InitializedEvent,
  OwnerTokensClaimed as OwnerTokensClaimedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RealEstateCreated as RealEstateCreatedEvent,
  SetBaseCurrency as SetBaseCurrencyEvent,
  SetRealEstateReserves as SetRealEstateReservesEvent,
  SetTreasury as SetTreasuryEvent,
  TokensClaimed as TokensClaimedEvent,
  Upgraded as UpgradedEvent,
  InitialRealEstateOffering as InitialRealEstateOfferingContract,
} from "../generated/InitialRealEstateOffering/InitialRealEstateOffering";

import { ERC20 as ERC20Contract } from "../generated/InitialRealEstateOffering/ERC20";
import { IRO, UserShare } from "../generated/schema";

enum Status {
  PENDING,
  ONGOING,
  SUCCESS,
  FAIL,
}

function normalizeRatio(iroContract: InitialRealEstateOfferingContract, num: number): BigDecimal {
  return new BigDecimal(new BigInt(num)).div(new BigDecimal(new BigInt(iroContract.DENOMINATOR())));
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
  let userShareBPS = normalizeRatio(
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
  let iro = new IRO(Bytes.fromBigInt(event.params._iroId));
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
}

export function handleFundsWithdrawn(event: FundsWithdrawnEvent): void {}

export function handleOwnerTokensClaimed(event: OwnerTokensClaimedEvent): void {}

export function handleRealEstateCreated(event: RealEstateCreatedEvent): void {}

export function handleTokensClaimed(event: TokensClaimedEvent): void {}
