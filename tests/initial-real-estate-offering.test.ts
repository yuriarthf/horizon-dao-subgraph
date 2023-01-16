import { assert, describe, test, clearStore, beforeAll, afterAll } from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes, BigDecimal } from "@graphprotocol/graph-ts";
import { IRO } from "../generated/schema";
import { AdminChanged as AdminChangedEvent } from "../generated/InitialRealEstateOffering/InitialRealEstateOffering";
import { handleCreateIRO } from "../src/initial-real-estate-offering";
import { createCreateIROEvent } from "./initial-real-estate-offering-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("handleCreateIRO()", () => {
  beforeAll(() => {
    console.log(
      BigDecimal.fromString("0")
        .div(new BigDecimal(new BigInt(10000)))
        .toString(),
    );
    const iroId = BigInt.fromString("0");
    const listingOwner = Address.fromString("0x0000000000000000000000000000000000000001");
    const unitPrice = BigInt.fromString("1000000");
    const listingOwnerShare = 2000;
    const treasuryFee = 1000;
    const reservesFee = 800;
    const start = BigInt.fromString("1672038278");
    const end = start.plus(BigInt.fromString("259200")); // start + 3 days

    let newCreateIROEvent = createCreateIROEvent(
      iroId,
      listingOwner,
      unitPrice,
      listingOwnerShare,
      treasuryFee,
      reservesFee,
      start,
      end,
    );
    handleCreateIRO(newCreateIROEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("IRO entity created", () => {
    assert.entityCount("IRO", 1);

    // CreateIRO event params
    const iroId = BigInt.fromString("0");
    const listingOwner = Address.fromString("0x0000000000000000000000000000000000000001");
    const unitPrice = BigInt.fromString("1000000");
    const listingOwnerShare = 2000;
    const treasuryFee = 1000;
    const reservesFee = 800;
    const start = BigInt.fromString("1672038278");
    const end = start.plus(BigInt.fromString("259200")); // start + 3 days

    // get entity ID
    const id = Bytes.fromByteArray(Bytes.fromBigInt(iroId)).toString();

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals("IRO", id, "iroId", iroId.toString());
    assert.fieldEquals("IRO", id, "status", "ONGOING");
    assert.fieldEquals("IRO", id, "listingOwner", listingOwner.toString());
    assert.fieldEquals("IRO", id, "unitPrice", unitPrice.toString());
    assert.fieldEquals("IRO", id, "listingOwnerShare", (listingOwnerShare / 10000).toString());
    assert.fieldEquals("IRO", id, "treasuryFee", (treasuryFee / 10000).toString());
    assert.fieldEquals("IRO", id, "reservesFee", (reservesFee / 10000).toString());
    assert.fieldEquals("IRO", id, "start", start.toString());
    assert.fieldEquals("IRO", id, "end", end.toString());
    assert.fieldEquals("IRO", id, "totalFunding", "0");
    assert.fieldEquals("IRO", id, "fundsWithdrawn", "false");
    assert.fieldEquals("IRO", id, "ownerClaimed", "false");

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
