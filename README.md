# javascript-convenience-store-precourse

# 편의점 구현

구매자의 할인 혜택과 재고 상황을 고려하여 최종 결제 금액을 계산하고 안내하는 결제 시스템을 구현한다.

사용자가 입력한 상품의 가격과 수량을 기반으로 최종 결제 금액을 계산한다.
총구매액은 상품별 가격과 수량을 곱하여 계산하며, 프로모션 및 멤버십 할인 정책을 반영하여 최종 결제 금액을 산출한다.
구매 내역과 산출한 금액 정보를 영수증으로 출력한다.
영수증 출력 후 추가 구매를 진행할지 또는 종료할지를 선택할 수 있다.
사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 Error를 발생시키고 해당 메시지를 출력한 다음 해당 지점부터 다시 입력을 받는다.

## 재고 확인

- [x] 파일 입출력을 통해 재고 현황을 불러온다.
  - [x] 만약 재고 파일의 형식이 올바르지 않을 시 [ERROR] 후 시스템 종료



## 환영 인사 출력

- [x] md 파일을 활용하여 환영 인사를 출력한다.
  안녕하세요. W편의점입니다.
  현재 보유하고 있는 상품입니다.

      - 콜라 1,000원 10개 탄산2+1
      - 콜라 1,000원 10개
      - 사이다 1,000원 8개 탄산2+1
      - 사이다 1,000원 7개
      - 오렌지주스 1,800원 9개 MD추천상품
      - 오렌지주스 1,800원 재고 없음
      - 탄산수 1,200원 5개 탄산2+1
      - 탄산수 1,200원 재고 없음
      - 물 500원 10개
      - 비타민워터 1,500원 6개
      - 감자칩 1,500원 5개 반짝할인
      - 감자칩 1,500원 5개
      - 초코바 1,200원 5개 MD추천상품
      - 초코바 1,200원 5개
      - 에너지바 2,000원 5개
      - 정식도시락 6,400원 8개
      - 컵라면 1,700원 1개 MD추천상품
      - 컵라면 1,700원 10개

## 구매 상품 및 수량 입력

- [x] 구매 안내 메시지를 출력한다.

  - 구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])
- [x] 구매할 상품과 수량을 입력받는다.
  - 상품명과 수량은 하이픈으로, 개별 상품은 대괄호로 묶어 쉼표로 구분한다.
  - [x] 양식에 맞지 않는 입력이 들어왔을 때 [ERROR]
    - 구매할 상품과 수량 형식이 올바르지 않은 경우: [ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.
    - 존재하지 않는 상품을 입력한 경우: [ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.
    - 구매 수량이 재고 수량을 초과한 경우: [ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.
    - 기타 잘못된 입력의 경우: [ERROR] 잘못된 입력입니다. 다시 입력해 주세요.


### 프로모션 할인

## 프로모션 날짜 확인

- [x] 현재 날짜를 구한다.
- [x] 오늘 날짜가 프로모션 기간에 포함되어 있는지 확인한다.

## 프로모션 재고 확인

- [x] 프로모션 기간 중이라면 프로모션 재고를 우선적으로 차감한다.

- [x] 프로모션 적용 기준보다 적게 가져온 경우

  - [x] 혜택 안내 메시지를 출력한다. 
    - 현재 {상품명}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)
  - [x] 추가 여부를 입력받는다. (Y/N)

    - Y: 증정 받을 수 있는 상품을 추가한다.
    - N: 증정 받을 수 있는 상품을 추가하지 않는다.

    - [x] Y/N가 아닌 다른 입력이 들어왔을 때 [ERROR]

- [x] 프로모션 재고가 부족할 시 일반 재고를 사용하여 구매할 수 있다.

  - [x] 재고 부족 안내 메시지를 출력한다.
    - 현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)

  - [x] 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제하는 경우 일부 수량에 대해 정가 결제 여부를 입력받는다. (Y/N)
    - Y: 일부 수량에 대해 정가로 결제한다.
    - N: 정가로 결제해야하는 수량만큼 제외한 후 결제를 진행한다.
    - [x] Y/N가 아닌 다른 입력이 들어왔을 때 [ERROR]

- [x] 아래 목록을 확인할 수 있다.
  - [x] 프로모션 할인 적용 제품 목록 / 수량
  - [x] 프로모션 적용 목록에 대한 총 할인 금액

### 멤버십 할인 적용 여부 입력

- [x] 멤버십 할인 적용 메시지 출력
- [x] 멤버십 할인 적용 여부를 입력 받는다. (Y/N)
- [x] 멤버십 회원의 경우
  - [x] 프로모션 적용 후 남은 금액에 대해 30%를 할인 받는다.
  - [x] 멤버십 할인은 최대 8,000원까지 가능하다.
- [x] 멤버십 혜택을 통해 할인받은 금액을 확인할 수 있다.

## 재고 관리 구현

- [x] 상품 별 최종 구매 수량과 재고 수량을 고려하여 결제 가능 여부를 확인한다.
- [x] 상품을 구매할 때마다 결제된 수량만큼 해당 상품의 재고에서 차감하여 수량을 관리한다.
  - [x] 구매 수량이 재고보다 많다면 [ERROR]
- [x] 이후, 추가 구매를 위해 안내 메시지를 출력할 시 최신 재고 상태를 정확히 유지한다.

### 영수증 출력 구현

- [x] 영수증은 고객의 구매 내역과 할인을 요약하여 출력한다.
- 영수증 항목은 아래와 같다.
  - 구매 상품 내역: 구매한 상품명, 수량, 가격
  - 증정 상품 내역: 프로모션에 따라 무료로 제공된 증정 상품의 목록
  - 금액 정보
    총구매액: 구매한 상품의 총 수량과 총 금액
    행사할인: 프로모션에 의해 할인된 금액
    멤버십할인: 멤버십에 의해 추가로 할인된 금액
    내실돈: 최종 결제 금액
- 영수증의 구성 요소를 보기 좋게 정렬하여 고객이 쉽게 금액과 수량을 확인할 수 있게 한다.

### 추가 구매 여부 입력

- [x] 추가 구매 여부 메시지 출력

  - 감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)

- [x] 추가 구매 여부를 입력 받는다. (Y/N)
  - [x] Y/N가 아닌 다른 입력이 들어왔을 때 [ERROR]



## 테스트 코드
### inputTest
- [x] 재고 수량 초과한 입력 시 [ERROR]
- [x] 올바르지 않은 형식의 입력 시 [ERROR]
- [x] 존재하지 않는 상품을 입력 시 [ERROR]
- [] 추가 질문에서 Y/N(소문자 포함)이 아닌 입력이 들어올 시 [ERROR]

### promotionTest
- [x] 프로모션 해당 상품을 1개 부족하게 입력할 경우
- [x] 프로모션 해당 상품을 초과하여 입력한 경우
- [x] 여러개의 입력으 들어왔을 때, 두 가지 이상이 프로모션에 해당하는 경우
- [x] 기간에 해당하지 않는 프로모션 제품이 입력된 경우

### membershipTest
- [x] 멤버십 미적용
- [x] 프로모션 적용 후 멤버십 적용
- [x] 프로모션 미 적용 후 멤버십 적용

### inventoryTest
- [x] 상품 구매 후 인벤토리 테스트
- [x] 프로모션 상품 적용 후 인벤토리 업데이트 테스트
  - [x] 프로모션 상품이 재고를 초과하지 않았을 때 
  - [x] 프로모션 상품이 재고를 초과했을 때