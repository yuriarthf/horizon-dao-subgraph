// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class CashBack extends ethereum.Event {
  get params(): CashBack__Params {
    return new CashBack__Params(this);
  }
}

export class CashBack__Params {
  _event: CashBack;

  constructor(event: CashBack) {
    this._event = event;
  }

  get _iroId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _by(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _commitAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Commit extends ethereum.Event {
  get params(): Commit__Params {
    return new Commit__Params(this);
  }
}

export class Commit__Params {
  _event: Commit;

  constructor(event: Commit) {
    this._event = event;
  }

  get _iroId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _currency(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _value(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _purchasedAmount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class CreateIRO extends ethereum.Event {
  get params(): CreateIRO__Params {
    return new CreateIRO__Params(this);
  }
}

export class CreateIRO__Params {
  _event: CreateIRO;

  constructor(event: CreateIRO) {
    this._event = event;
  }

  get _iroId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _listingOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _currency(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _unitPrice(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _listingOwnerShare(): i32 {
    return this._event.parameters[4].value.toI32();
  }

  get _treasuryFee(): i32 {
    return this._event.parameters[5].value.toI32();
  }

  get _reservesFee(): i32 {
    return this._event.parameters[6].value.toI32();
  }

  get _start(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get _end(): BigInt {
    return this._event.parameters[8].value.toBigInt();
  }
}

export class FundsWithdrawn extends ethereum.Event {
  get params(): FundsWithdrawn__Params {
    return new FundsWithdrawn__Params(this);
  }
}

export class FundsWithdrawn__Params {
  _event: FundsWithdrawn;

  constructor(event: FundsWithdrawn) {
    this._event = event;
  }

  get _iroId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _by(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _realEstateFundsSet(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get _listingOwnerAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _treasuryAmount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get _realEstateReservesAmount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class OwnerTokensClaimed extends ethereum.Event {
  get params(): OwnerTokensClaimed__Params {
    return new OwnerTokensClaimed__Params(this);
  }
}

export class OwnerTokensClaimed__Params {
  _event: OwnerTokensClaimed;

  constructor(event: OwnerTokensClaimed) {
    this._event = event;
  }

  get _iroId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _by(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RealEstateCreated extends ethereum.Event {
  get params(): RealEstateCreated__Params {
    return new RealEstateCreated__Params(this);
  }
}

export class RealEstateCreated__Params {
  _event: RealEstateCreated;

  constructor(event: RealEstateCreated) {
    this._event = event;
  }

  get _iroId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _realEstateId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class SetBaseCurrency extends ethereum.Event {
  get params(): SetBaseCurrency__Params {
    return new SetBaseCurrency__Params(this);
  }
}

export class SetBaseCurrency__Params {
  _event: SetBaseCurrency;

  constructor(event: SetBaseCurrency) {
    this._event = event;
  }

  get _by(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _currency(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class SetRealEstateReserves extends ethereum.Event {
  get params(): SetRealEstateReserves__Params {
    return new SetRealEstateReserves__Params(this);
  }
}

export class SetRealEstateReserves__Params {
  _event: SetRealEstateReserves;

  constructor(event: SetRealEstateReserves) {
    this._event = event;
  }

  get _by(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _realEstateReserves(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class SetTreasury extends ethereum.Event {
  get params(): SetTreasury__Params {
    return new SetTreasury__Params(this);
  }
}

export class SetTreasury__Params {
  _event: SetTreasury;

  constructor(event: SetTreasury) {
    this._event = event;
  }

  get _by(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _treasury(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TokensClaimed extends ethereum.Event {
  get params(): TokensClaimed__Params {
    return new TokensClaimed__Params(this);
  }
}

export class TokensClaimed__Params {
  _event: TokensClaimed;

  constructor(event: TokensClaimed) {
    this._event = event;
  }

  get _iroId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _by(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class InitialRealEstateOffering__getIROResultValue0Struct extends ethereum.Tuple {
  get listingOwner(): Address {
    return this[0].toAddress();
  }

  get start(): BigInt {
    return this[1].toBigInt();
  }

  get treasuryFee(): i32 {
    return this[2].toI32();
  }

  get reservesFee(): i32 {
    return this[3].toI32();
  }

  get listingOwnerShare(): i32 {
    return this[4].toI32();
  }

  get end(): BigInt {
    return this[5].toBigInt();
  }

  get currency(): Address {
    return this[6].toAddress();
  }

  get softCap(): BigInt {
    return this[7].toBigInt();
  }

  get hardCap(): BigInt {
    return this[8].toBigInt();
  }

  get unitPrice(): BigInt {
    return this[9].toBigInt();
  }

  get totalFunding(): BigInt {
    return this[10].toBigInt();
  }
}

export class InitialRealEstateOffering__totalSupplyIntervalResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getMinTotalSupply(): BigInt {
    return this.value0;
  }

  getMaxTotalSupply(): BigInt {
    return this.value1;
  }
}

export class InitialRealEstateOffering__userAmountAndShareResult {
  value0: BigInt;
  value1: i32;

  constructor(value0: BigInt, value1: i32) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    return map;
  }

  getAmount(): BigInt {
    return this.value0;
  }

  getShare(): i32 {
    return this.value1;
  }
}

export class InitialRealEstateOffering extends ethereum.SmartContract {
  static bind(address: Address): InitialRealEstateOffering {
    return new InitialRealEstateOffering("InitialRealEstateOffering", address);
  }

  DENOMINATOR(): i32 {
    let result = super.call("DENOMINATOR", "DENOMINATOR():(uint16)", []);

    return result[0].toI32();
  }

  try_DENOMINATOR(): ethereum.CallResult<i32> {
    let result = super.tryCall("DENOMINATOR", "DENOMINATOR():(uint16)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  commits(param0: BigInt, param1: Address): BigInt {
    let result = super.call("commits", "commits(uint256,address):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0),
      ethereum.Value.fromAddress(param1)
    ]);

    return result[0].toBigInt();
  }

  try_commits(param0: BigInt, param1: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "commits",
      "commits(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  currency(): Address {
    let result = super.call("currency", "currency():(address)", []);

    return result[0].toAddress();
  }

  try_currency(): ethereum.CallResult<Address> {
    let result = super.tryCall("currency", "currency():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getIRO(_iroId: BigInt): InitialRealEstateOffering__getIROResultValue0Struct {
    let result = super.call(
      "getIRO",
      "getIRO(uint256):((address,uint64,uint16,uint16,uint16,uint64,address,uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );

    return changetype<InitialRealEstateOffering__getIROResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getIRO(
    _iroId: BigInt
  ): ethereum.CallResult<InitialRealEstateOffering__getIROResultValue0Struct> {
    let result = super.tryCall(
      "getIRO",
      "getIRO(uint256):((address,uint64,uint16,uint16,uint16,uint64,address,uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<InitialRealEstateOffering__getIROResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getStatus(_iroId: BigInt): i32 {
    let result = super.call("getStatus", "getStatus(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(_iroId)
    ]);

    return result[0].toI32();
  }

  try_getStatus(_iroId: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall("getStatus", "getStatus(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(_iroId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  iroLength(): BigInt {
    let result = super.call("iroLength", "iroLength():(uint256)", []);

    return result[0].toBigInt();
  }

  try_iroLength(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("iroLength", "iroLength():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  listingOwnerAmount(_iroId: BigInt): BigInt {
    let result = super.call(
      "listingOwnerAmount",
      "listingOwnerAmount(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );

    return result[0].toBigInt();
  }

  try_listingOwnerAmount(_iroId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "listingOwnerAmount",
      "listingOwnerAmount(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  now64(): BigInt {
    let result = super.call("now64", "now64():(uint64)", []);

    return result[0].toBigInt();
  }

  try_now64(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("now64", "now64():(uint64)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  price(_iroId: BigInt, _amountToPurchase: BigInt): BigInt {
    let result = super.call("price", "price(uint256,uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_iroId),
      ethereum.Value.fromUnsignedBigInt(_amountToPurchase)
    ]);

    return result[0].toBigInt();
  }

  try_price(
    _iroId: BigInt,
    _amountToPurchase: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall("price", "price(uint256,uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_iroId),
      ethereum.Value.fromUnsignedBigInt(_amountToPurchase)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proxiableUUID(): Bytes {
    let result = super.call("proxiableUUID", "proxiableUUID():(bytes32)", []);

    return result[0].toBytes();
  }

  try_proxiableUUID(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "proxiableUUID",
      "proxiableUUID():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  realEstateId(param0: BigInt): BigInt {
    let result = super.call("realEstateId", "realEstateId(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toBigInt();
  }

  try_realEstateId(param0: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "realEstateId",
      "realEstateId(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  realEstateNft(): Address {
    let result = super.call("realEstateNft", "realEstateNft():(address)", []);

    return result[0].toAddress();
  }

  try_realEstateNft(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "realEstateNft",
      "realEstateNft():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  realEstateReserves(): Address {
    let result = super.call(
      "realEstateReserves",
      "realEstateReserves():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_realEstateReserves(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "realEstateReserves",
      "realEstateReserves():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  remainingTokens(_iroId: BigInt): BigInt {
    let result = super.call(
      "remainingTokens",
      "remainingTokens(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );

    return result[0].toBigInt();
  }

  try_remainingTokens(_iroId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "remainingTokens",
      "remainingTokens(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalSupply(_iroId: BigInt): BigInt {
    let result = super.call("totalSupply", "totalSupply(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_iroId)
    ]);

    return result[0].toBigInt();
  }

  try_totalSupply(_iroId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalSupply",
      "totalSupply(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalSupplyInterval(
    _iroId: BigInt
  ): InitialRealEstateOffering__totalSupplyIntervalResult {
    let result = super.call(
      "totalSupplyInterval",
      "totalSupplyInterval(uint256):(uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );

    return new InitialRealEstateOffering__totalSupplyIntervalResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_totalSupplyInterval(
    _iroId: BigInt
  ): ethereum.CallResult<InitialRealEstateOffering__totalSupplyIntervalResult> {
    let result = super.tryCall(
      "totalSupplyInterval",
      "totalSupplyInterval(uint256):(uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(_iroId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new InitialRealEstateOffering__totalSupplyIntervalResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  treasury(): Address {
    let result = super.call("treasury", "treasury():(address)", []);

    return result[0].toAddress();
  }

  try_treasury(): ethereum.CallResult<Address> {
    let result = super.tryCall("treasury", "treasury():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  userAmountAndShare(
    _iroId: BigInt,
    _user: Address
  ): InitialRealEstateOffering__userAmountAndShareResult {
    let result = super.call(
      "userAmountAndShare",
      "userAmountAndShare(uint256,address):(uint256,uint16)",
      [
        ethereum.Value.fromUnsignedBigInt(_iroId),
        ethereum.Value.fromAddress(_user)
      ]
    );

    return new InitialRealEstateOffering__userAmountAndShareResult(
      result[0].toBigInt(),
      result[1].toI32()
    );
  }

  try_userAmountAndShare(
    _iroId: BigInt,
    _user: Address
  ): ethereum.CallResult<InitialRealEstateOffering__userAmountAndShareResult> {
    let result = super.tryCall(
      "userAmountAndShare",
      "userAmountAndShare(uint256,address):(uint256,uint16)",
      [
        ethereum.Value.fromUnsignedBigInt(_iroId),
        ethereum.Value.fromAddress(_user)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new InitialRealEstateOffering__userAmountAndShareResult(
        value[0].toBigInt(),
        value[1].toI32()
      )
    );
  }
}

export class ClaimCall extends ethereum.Call {
  get inputs(): ClaimCall__Inputs {
    return new ClaimCall__Inputs(this);
  }

  get outputs(): ClaimCall__Outputs {
    return new ClaimCall__Outputs(this);
  }
}

export class ClaimCall__Inputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }

  get _iroId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ClaimCall__Outputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class CommitCall extends ethereum.Call {
  get inputs(): CommitCall__Inputs {
    return new CommitCall__Inputs(this);
  }

  get outputs(): CommitCall__Outputs {
    return new CommitCall__Outputs(this);
  }
}

export class CommitCall__Inputs {
  _call: CommitCall;

  constructor(call: CommitCall) {
    this._call = call;
  }

  get _iroId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _amountToPurchase(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CommitCall__Outputs {
  _call: CommitCall;

  constructor(call: CommitCall) {
    this._call = call;
  }
}

export class CreateIROCall extends ethereum.Call {
  get inputs(): CreateIROCall__Inputs {
    return new CreateIROCall__Inputs(this);
  }

  get outputs(): CreateIROCall__Outputs {
    return new CreateIROCall__Outputs(this);
  }
}

export class CreateIROCall__Inputs {
  _call: CreateIROCall;

  constructor(call: CreateIROCall) {
    this._call = call;
  }

  get _listingOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _listingOwnerShare(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _treasuryFee(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get _reservesFee(): i32 {
    return this._call.inputValues[3].value.toI32();
  }

  get _duration(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _softCap(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _hardCap(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get _unitPrice(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get _startOffset(): BigInt {
    return this._call.inputValues[8].value.toBigInt();
  }
}

export class CreateIROCall__Outputs {
  _call: CreateIROCall;

  constructor(call: CreateIROCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _realEstateNft(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _treasury(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _realEstateReserves(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _currency(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class ListingOwnerClaimCall extends ethereum.Call {
  get inputs(): ListingOwnerClaimCall__Inputs {
    return new ListingOwnerClaimCall__Inputs(this);
  }

  get outputs(): ListingOwnerClaimCall__Outputs {
    return new ListingOwnerClaimCall__Outputs(this);
  }
}

export class ListingOwnerClaimCall__Inputs {
  _call: ListingOwnerClaimCall;

  constructor(call: ListingOwnerClaimCall) {
    this._call = call;
  }

  get _iroId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ListingOwnerClaimCall__Outputs {
  _call: ListingOwnerClaimCall;

  constructor(call: ListingOwnerClaimCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetCurrencyCall extends ethereum.Call {
  get inputs(): SetCurrencyCall__Inputs {
    return new SetCurrencyCall__Inputs(this);
  }

  get outputs(): SetCurrencyCall__Outputs {
    return new SetCurrencyCall__Outputs(this);
  }
}

export class SetCurrencyCall__Inputs {
  _call: SetCurrencyCall;

  constructor(call: SetCurrencyCall) {
    this._call = call;
  }

  get _currency(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetCurrencyCall__Outputs {
  _call: SetCurrencyCall;

  constructor(call: SetCurrencyCall) {
    this._call = call;
  }
}

export class SetRealEstateReservesCall extends ethereum.Call {
  get inputs(): SetRealEstateReservesCall__Inputs {
    return new SetRealEstateReservesCall__Inputs(this);
  }

  get outputs(): SetRealEstateReservesCall__Outputs {
    return new SetRealEstateReservesCall__Outputs(this);
  }
}

export class SetRealEstateReservesCall__Inputs {
  _call: SetRealEstateReservesCall;

  constructor(call: SetRealEstateReservesCall) {
    this._call = call;
  }

  get _realEstateReserves(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetRealEstateReservesCall__Outputs {
  _call: SetRealEstateReservesCall;

  constructor(call: SetRealEstateReservesCall) {
    this._call = call;
  }
}

export class SetTreasuryCall extends ethereum.Call {
  get inputs(): SetTreasuryCall__Inputs {
    return new SetTreasuryCall__Inputs(this);
  }

  get outputs(): SetTreasuryCall__Outputs {
    return new SetTreasuryCall__Outputs(this);
  }
}

export class SetTreasuryCall__Inputs {
  _call: SetTreasuryCall;

  constructor(call: SetTreasuryCall) {
    this._call = call;
  }

  get _treasury(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetTreasuryCall__Outputs {
  _call: SetTreasuryCall;

  constructor(call: SetTreasuryCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _iroId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}