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
import { ERROR_MESSAGE, INPUT_ERROR_MESSAGE } from '../src/Utils/Constnats.js';


describe("입력 테스트", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    test("재고 수량을 초과한 수량을 입력할 시 에러를 발생시킨다.", async () => {
        await runExceptions({
            inputs: ["[컵라면-12]", "N", "N"],
            inputsToTerminate: INPUTS_TO_TERMINATE,
            expectedErrorMessage:
                INPUT_ERROR_MESSAGE.EXCEED_STOCK,
        });
    });

    test("올바르지 않은 형식의 구매 요청이 들어오면 에러를 발생시킨다.", async () => {
        await runExceptions({
            inputs: ["[컵라면]", "N", "N"],
            inputsToTerminate: INPUTS_TO_TERMINATE,
            expectedErrorMessage: INPUT_ERROR_MESSAGE.PURCHASE_LIST_FORMAT_ERROR,
        });
    });

    test("존재하지 않는 상품이 입력되면 에러를 발생시킨다.", async () => {
        await runExceptions({
            inputs: ["[종이-2]", "N", "N"],
            inputsToTerminate: INPUTS_TO_TERMINATE,
            expectedErrorMessage: INPUT_ERROR_MESSAGE.NON_EXISTENT_PRODUCT,
        });
    });
});