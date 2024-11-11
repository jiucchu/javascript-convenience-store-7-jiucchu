import {
    mockQuestions,
    mockNowDate,
    getLogSpy,
    getOutput,
    expectLogContains,
    expectLogContainsWithoutSpacesAndEquals,
    runExceptions,
    run,
    INPUTS_TO_TERMINATE
} from './ApplicationTest.js'
import { INPUT_ERROR_MESSAGE } from '../src/Utils/Constnats.js';

describe("프로모션 테스트", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    test("프로모션 해당 상품을 1개 부족하게 입력 시, 추가 여부 입력 후 적용. - 추가 O", async () => {
        await run({
            inputs: ["[감자칩-3]", "Y", "N", "N"],
            expectedIgnoringWhiteSpaces: ["감자칩4", "내실돈3,000"],
        });
    });

    test("프로모션 해당 상품을 1개 부족하게 입력 시, 추가 여부 입력 후 적용. - 추가 X", async () => {
        await run({
            inputs: ["[감자칩-3]", "N", "N", "N"],
            expectedIgnoringWhiteSpaces: ["감자칩3", "내실돈3,000"],
        });
    });


    test("프로모션 해당 상품을 초과하여 입력 시, 제외 여부 입력 후 적용 - 제외 X", async () => {
        await run({
            inputs: ["[사이다-9]", "Y", "N", "N"],
            expectedIgnoringWhiteSpaces: ["사이다9", "내실돈7,000"],
        });
    });

    test("프로모션 해당 상품을 초과하여 입력 시, 제외 여부 입력 후 적용 - 제외 O", async () => {
        await run({
            inputs: ["[사이다-9]", "N", "N", "N"],
            expectedIgnoringWhiteSpaces: ["사이다6", "내실돈4,000"],
        });
    });

    test("여러개의 입력을 받았을 때, 각각 1개 부족하게 입력 / 초과하여 입력 되었을 때 - 추가 o, 제외 x", async () => {
        await run({
            inputs: ["[사이다-9], [감자칩-3]", "Y", "Y", "Y", "N"],
            expectedIgnoringWhiteSpaces: ["사이다9", "감자칩4", "행사할인-5,000"],
        });
    });


    test("기간에 해당하지 않는 프로모션 적용", async () => {
        mockNowDate("2024-02-01");

        await run({
            inputs: ["[감자칩-2]", "N", "N"],
            expectedIgnoringWhiteSpaces: ["내실돈3,000"],
        });
    });

});
