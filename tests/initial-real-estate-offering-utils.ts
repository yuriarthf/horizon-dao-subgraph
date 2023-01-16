import { newMockEvent, createMockedFunction } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import {
  AdminChanged,
  BeaconUpgraded,
  CashBack,
  Commit,
  CreateIRO,
  FundsWithdrawn,
  Initialized,
  OwnerTokensClaimed,
  OwnershipTransferred,
  RealEstateCreated,
  SetBaseCurrency,
  SetRealEstateReserves,
  SetTreasury,
  TokensClaimed,
  Upgraded,
} from "../generated/InitialRealEstateOffering/InitialRealEstateOffering";

export function mockIROContract(address: Address): void {
  createMockedFunction(address, "DENOMINATOR", "DENOMINATOR():uint16").returns([ethereum.Value.fromString("10000")]);
}

export function createAdminChangedEvent(previousAdmin: Address, newAdmin: Address): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent());

  adminChangedEvent.parameters = new Array();

  adminChangedEvent.parameters.push(
    new ethereum.EventParam("previousAdmin", ethereum.Value.fromAddress(previousAdmin)),
  );
  adminChangedEvent.parameters.push(new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin)));

  return adminChangedEvent;
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent());

  beaconUpgradedEvent.parameters = new Array();

  beaconUpgradedEvent.parameters.push(new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon)));

  return beaconUpgradedEvent;
}

export function createCashBackEvent(_iroId: BigInt, _by: Address, _to: Address, _commitAmount: BigInt): CashBack {
  let cashBackEvent = changetype<CashBack>(newMockEvent());

  cashBackEvent.parameters = new Array();

  cashBackEvent.parameters.push(new ethereum.EventParam("_iroId", ethereum.Value.fromUnsignedBigInt(_iroId)));
  cashBackEvent.parameters.push(new ethereum.EventParam("_by", ethereum.Value.fromAddress(_by)));
  cashBackEvent.parameters.push(new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to)));
  cashBackEvent.parameters.push(
    new ethereum.EventParam("_commitAmount", ethereum.Value.fromUnsignedBigInt(_commitAmount)),
  );

  return cashBackEvent;
}

export function createCommitEvent(
  _iroId: BigInt,
  _user: Address,
  _currency: Address,
  _amountInBase: BigInt,
  _purchasedTokens: BigInt,
): Commit {
  let commitEvent = changetype<Commit>(newMockEvent());

  commitEvent.parameters = new Array();

  commitEvent.parameters.push(new ethereum.EventParam("_iroId", ethereum.Value.fromUnsignedBigInt(_iroId)));
  commitEvent.parameters.push(new ethereum.EventParam("_user", ethereum.Value.fromAddress(_user)));
  commitEvent.parameters.push(new ethereum.EventParam("_currency", ethereum.Value.fromAddress(_currency)));
  commitEvent.parameters.push(
    new ethereum.EventParam("_amountInBase", ethereum.Value.fromUnsignedBigInt(_amountInBase)),
  );
  commitEvent.parameters.push(
    new ethereum.EventParam("_purchasedTokens", ethereum.Value.fromUnsignedBigInt(_purchasedTokens)),
  );

  return commitEvent;
}

export function createCreateIROEvent(
  _iroId: BigInt,
  _listingOwner: Address,
  _unitPrice: BigInt,
  _listingOwnerShare: i32,
  _treasuryFee: i32,
  _reservesFee: i32,
  _start: BigInt,
  _end: BigInt,
): CreateIRO {
  let createIroEvent = changetype<CreateIRO>(newMockEvent());

  createIroEvent.parameters = new Array();

  createIroEvent.parameters.push(new ethereum.EventParam("_iroId", ethereum.Value.fromUnsignedBigInt(_iroId)));
  createIroEvent.parameters.push(new ethereum.EventParam("_listingOwner", ethereum.Value.fromAddress(_listingOwner)));
  createIroEvent.parameters.push(new ethereum.EventParam("_unitPrice", ethereum.Value.fromUnsignedBigInt(_unitPrice)));
  createIroEvent.parameters.push(
    new ethereum.EventParam(
      "_listingOwnerShare",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_listingOwnerShare)),
    ),
  );
  createIroEvent.parameters.push(
    new ethereum.EventParam("_treasuryFee", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_treasuryFee))),
  );
  createIroEvent.parameters.push(
    new ethereum.EventParam("_reservesFee", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_reservesFee))),
  );
  createIroEvent.parameters.push(new ethereum.EventParam("_start", ethereum.Value.fromUnsignedBigInt(_start)));
  createIroEvent.parameters.push(new ethereum.EventParam("_end", ethereum.Value.fromUnsignedBigInt(_end)));

  return createIroEvent;
}

export function createFundsWithdrawnEvent(
  _iroId: BigInt,
  _by: Address,
  _realEstateFundsSet: boolean,
  _listingOwnerAmount: BigInt,
  _treasuryAmount: BigInt,
  _realEstateReservesAmount: BigInt,
): FundsWithdrawn {
  let fundsWithdrawnEvent = changetype<FundsWithdrawn>(newMockEvent());

  fundsWithdrawnEvent.parameters = new Array();

  fundsWithdrawnEvent.parameters.push(new ethereum.EventParam("_iroId", ethereum.Value.fromUnsignedBigInt(_iroId)));
  fundsWithdrawnEvent.parameters.push(new ethereum.EventParam("_by", ethereum.Value.fromAddress(_by)));
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("_realEstateFundsSet", ethereum.Value.fromBoolean(_realEstateFundsSet)),
  );
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("_listingOwnerAmount", ethereum.Value.fromUnsignedBigInt(_listingOwnerAmount)),
  );
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("_treasuryAmount", ethereum.Value.fromUnsignedBigInt(_treasuryAmount)),
  );
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("_realEstateReservesAmount", ethereum.Value.fromUnsignedBigInt(_realEstateReservesAmount)),
  );

  return fundsWithdrawnEvent;
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent());

  initializedEvent.parameters = new Array();

  initializedEvent.parameters.push(
    new ethereum.EventParam("version", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))),
  );

  return initializedEvent;
}

export function createOwnerTokensClaimedEvent(
  _iroId: BigInt,
  _by: Address,
  _to: Address,
  _amount: BigInt,
): OwnerTokensClaimed {
  let ownerTokensClaimedEvent = changetype<OwnerTokensClaimed>(newMockEvent());

  ownerTokensClaimedEvent.parameters = new Array();

  ownerTokensClaimedEvent.parameters.push(new ethereum.EventParam("_iroId", ethereum.Value.fromUnsignedBigInt(_iroId)));
  ownerTokensClaimedEvent.parameters.push(new ethereum.EventParam("_by", ethereum.Value.fromAddress(_by)));
  ownerTokensClaimedEvent.parameters.push(new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to)));
  ownerTokensClaimedEvent.parameters.push(
    new ethereum.EventParam("_amount", ethereum.Value.fromUnsignedBigInt(_amount)),
  );

  return ownerTokensClaimedEvent;
}

export function createOwnershipTransferredEvent(previousOwner: Address, newOwner: Address): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(newMockEvent());

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("previousOwner", ethereum.Value.fromAddress(previousOwner)),
  );
  ownershipTransferredEvent.parameters.push(new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner)));

  return ownershipTransferredEvent;
}

export function createRealEstateCreatedEvent(_iroId: BigInt, _realEstateId: BigInt): RealEstateCreated {
  let realEstateCreatedEvent = changetype<RealEstateCreated>(newMockEvent());

  realEstateCreatedEvent.parameters = new Array();

  realEstateCreatedEvent.parameters.push(new ethereum.EventParam("_iroId", ethereum.Value.fromUnsignedBigInt(_iroId)));
  realEstateCreatedEvent.parameters.push(
    new ethereum.EventParam("_realEstateId", ethereum.Value.fromUnsignedBigInt(_realEstateId)),
  );

  return realEstateCreatedEvent;
}

export function createSetBaseCurrencyEvent(_by: Address, _currency: Address): SetBaseCurrency {
  let setBaseCurrencyEvent = changetype<SetBaseCurrency>(newMockEvent());

  setBaseCurrencyEvent.parameters = new Array();

  setBaseCurrencyEvent.parameters.push(new ethereum.EventParam("_by", ethereum.Value.fromAddress(_by)));
  setBaseCurrencyEvent.parameters.push(new ethereum.EventParam("_currency", ethereum.Value.fromAddress(_currency)));

  return setBaseCurrencyEvent;
}

export function createSetRealEstateReservesEvent(_by: Address, _realEstateReserves: Address): SetRealEstateReserves {
  let setRealEstateReservesEvent = changetype<SetRealEstateReserves>(newMockEvent());

  setRealEstateReservesEvent.parameters = new Array();

  setRealEstateReservesEvent.parameters.push(new ethereum.EventParam("_by", ethereum.Value.fromAddress(_by)));
  setRealEstateReservesEvent.parameters.push(
    new ethereum.EventParam("_realEstateReserves", ethereum.Value.fromAddress(_realEstateReserves)),
  );

  return setRealEstateReservesEvent;
}

export function createSetTreasuryEvent(_by: Address, _treasury: Address): SetTreasury {
  let setTreasuryEvent = changetype<SetTreasury>(newMockEvent());

  setTreasuryEvent.parameters = new Array();

  setTreasuryEvent.parameters.push(new ethereum.EventParam("_by", ethereum.Value.fromAddress(_by)));
  setTreasuryEvent.parameters.push(new ethereum.EventParam("_treasury", ethereum.Value.fromAddress(_treasury)));

  return setTreasuryEvent;
}

export function createTokensClaimedEvent(_iroId: BigInt, _by: Address, _to: Address, _amount: BigInt): TokensClaimed {
  let tokensClaimedEvent = changetype<TokensClaimed>(newMockEvent());

  tokensClaimedEvent.parameters = new Array();

  tokensClaimedEvent.parameters.push(new ethereum.EventParam("_iroId", ethereum.Value.fromUnsignedBigInt(_iroId)));
  tokensClaimedEvent.parameters.push(new ethereum.EventParam("_by", ethereum.Value.fromAddress(_by)));
  tokensClaimedEvent.parameters.push(new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to)));
  tokensClaimedEvent.parameters.push(new ethereum.EventParam("_amount", ethereum.Value.fromUnsignedBigInt(_amount)));

  return tokensClaimedEvent;
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent());

  upgradedEvent.parameters = new Array();

  upgradedEvent.parameters.push(new ethereum.EventParam("implementation", ethereum.Value.fromAddress(implementation)));

  return upgradedEvent;
}
