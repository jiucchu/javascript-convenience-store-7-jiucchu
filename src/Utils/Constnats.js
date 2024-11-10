export const INPUT_MESSAGE = Object.freeze({
    PURCHASE_INFORMATION: '\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',

})

export const OUTPUT_MESSAGE = Object.freeze({
    WELCOME_MESSAGE: '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n',
})


export const ERROR_MESSAGE = Object.freeze({
    NAME_IS_NOT_STRING: `[ERROR] 상품의 이름이 문자가 아닙니다.`,
    NAME_IS_NULL: `[ERROR] 상품의 이름은 비어있을 수 없습니다.`,

    PRICE_IS_NOT_NUMBER: `[ERROR] 상품의 가격이 숫자가 아닙니다.`,
    QUANTITY_IS_NOT_NUMBER: `[ERROR] 상품의 수량이 숫자가 아닙니다.`,
    PROMOTION_IS_NOT_STRING: `[ERROR] 올바른 프로모션이 아닙니다.`,
})

export const INPUT_ERROR_MESSAGE = Object.freeze({
    PURCHASE_LIST_FROM_ERROR: '[ERROR] 구매 상품 목록의 형식이 올바르지 않습니다.',
    PURCHASE_AMOUNT_OVERFLOW_ERROR: '[ERROR] 구매 상품의 수량이 재고보다 많습니다.',

    PROMOTION_PRODUCT_ADD_ERROR: '[ERROR] Y 또는 N으로 입력해주세요.',
    PROMOTION_PRODUCT_PULL_PRICE_ERROR: '[ERROR] Y 또는 N으로 입력해주세요.',

    MEMBERSHIP_DISCOUNT_ERROR: '[ERROR] Y 또는 N으로 입력해주세요.',
    ADDITIONAL_PURCHASE_ERROR: '[ERROR] Y 또는 N으로 입력해주세요.',
})

export const CONSTANTS = Object.freeze({

})