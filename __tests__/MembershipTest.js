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

describe("멤버십 적용 테스트 테스트", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    test("멤버십 할인 미적용", async () => {
        await run({
            inputs: ["[물-10]", "N", "N"],
            expectedIgnoringWhiteSpaces: ["물10", "멤버십할인0"],
        });
    });

    test("프로모션 추가 상품 없이 멤버십 적용", async () => {
        await run({
            inputs: ["[물-10]", "Y", "N"],
            expectedIgnoringWhiteSpaces: ["물10", "멤버십할인-1,500"],
        });
    });

    test("프로모션 상품 추가 후 멤버십 적용", async () => {
        await run({
            inputs: ["[오렌지주스-7],[물-10]", "Y", "Y", "N"],
            expectedIgnoringWhiteSpaces: ["오렌지주스8", "멤버십할인-1,500"],
        });
    });


});
