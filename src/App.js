import { Console } from "@woowacourse/mission-utils";
import ApplyPromotion from "./Module/ApplyPromotion.js";
import InventoryControl from "./Module/InventoryControl.js";
import Membership from "./Module/Membership.js";
import { InputUtils } from "./Utils/ioUtils.js";
import Purchase from "./Module/Purchase.js";
import POS from "./Module/POS.js";

class App {


  async run() {
    const inventory = new InventoryControl();
    const pos = new POS(inventory);

    await pos.run();

  }
}

export default App;
