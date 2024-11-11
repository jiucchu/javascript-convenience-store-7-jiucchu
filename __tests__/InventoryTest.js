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

describe("인벤토리 테스트", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    test("상품을 구매했을 시, 인벤토리에 차감하여 반영한다.", async () => {
        await run({
            inputs: ["[물-10]", "N", "Y", ...INPUTS_TO_TERMINATE],
            expectedIgnoringWhiteSpaces: ["물500원재고없음"],
        });
    });

    test("프로모션 상품을 구매했을 시, 프로모션 재고를 먼저 차감한다.", async () => {
        await run({
            inputs: ["[사이다-3]", "N", "Y", ...INPUTS_TO_TERMINATE],
            expectedIgnoringWhiteSpaces: ["사이다1,000원5개탄산2+1"],
        });
    });

    test("프로모션 재고보다 초과되도록 상품을 구매했을 시, 정가 구매 여부를 묻고 프로모션 미진행 재고에서 차감한다.", async () => {
        await run({
            inputs: ["[사이다-9]", "Y", "N", "Y", ...INPUTS_TO_TERMINATE],
            expectedIgnoringWhiteSpaces: ["사이다1,000원2개탄산2+1", "사이다1,000원4개"],
        });
    });


});
