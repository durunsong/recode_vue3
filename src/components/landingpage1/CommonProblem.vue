<template>
  <div class="common-problems">
    <h1>{{ t("promote_problem_title") }}</h1>
    <div class="problem-content">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          :name="index"
          v-for="(item, index) in problemData"
          :key="index"
          :title="item.problemText"
        >
          <div>
            <p class="answer-content">
              {{ item.answerText }}
              <a
                v-if="item.specialUrl"
                :href="item.specialUrl"
                target="_blank"
                >{{ item.specialUrl }}</a
              >
            </p>
          </div>
          <div></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { userPomotionStore } from "@/store";
const store = userPomotionStore();
const activeName = ref(0);
const { t } = useI18n();

let problemData = computed(() => {
  const list = [
    {
      problemText: "Freight paid in advance",
      answerText:
        "1.Submit waybill and pay shipping\n2.After we wrap parcel,if the weight lower than you paid for,please contact us.We will refund difference to your hagobuy balance.",
    },
    {
      problemText: "Not paying for shipping first",
      answerText:
        "1.Submit waybill and don't pay shipping,contact us.\n2.After we rehearse the parcel,we will modify the weight and freight and inform you.",
    },
    {
      problemText: "Why has the withdrawn balance not arrived yet?",
      answerText:
        "Withdrawing the balance requires manual approval. It usually takes 2-3 days. Please wait patiently.There are cash withdrawal instructions here, you can click in and have a look",
      specialUrl:
        "https://www.hagobuy.com/service/help/question?id=104" +
        `${store.dynamicAffcode}`,
    },
    {
      problemText: "When will the parcel be delivered?",
      answerText:
        "Sorry, we are not sure about the specific time. The logistics status shall prevail. If the logistics has not been updated for more than eight days, then you have to ask the customer service for details. You can use the tracking code to check the status of the parcel at this website:",
      specialUrl: "https://www.17track.net/",
    },
    {
      problemText: "Why has the refund not arrived yet?",
      answerText:
        "Refunds require manual operations, there are two situations\n1. If the product you applied for refund has arrived at the warehouse, we need to return the product to the merchant, wait for the merchant to receive the product and return the money to us, than we will refund the money to you. It generally takes 5-10 days\n2. If the merchandise you apply for refund has not been delivered by the merchant, only need the merchant to return the money to us, and we will refund you immediately, usually within 2-3 days",
      specialUrl: "",
    },
    {
      problemText:
        "Can return or exchange the product after it arrives at the warehouse?",
      answerText:
        "First we need to talk to the seller about whether the product can be returned or exchange,if the merchant agrees,you can return the product,but you need to bear the domestic shipping fee generated by returning it from the warehouse to the merchant and the handling fee for manual return 5 yuan",
      specialUrl: "",
    },
    {
      problemText: "Forwarding service",
      answerText:
        "1.find 【forwarding】on home page\n2.upload【tracking number】of the parcel that sent to our warehouse.(Note: Please upload the tracking code in time, otherwise our warehouse will not be able to find your parcel)\nThis is our address.\n Receiver:小小李-12358070\n Address:福建省厦门市翔安区翔天路恒欣达工业园28号电梯3楼hago(不要放快递柜)\n Post/ZIP code:361115",
      specialUrl: "",
    },
    {
      problemText: "Why hasn't the parcel arrived at the warehouse yet?",
      answerText:
        "We purchase your order,but seller hasn't shipped your order,If you want to urge seller, contact the purchaser in the commodity message.If you can't wait anymore,please apply return goods.",
      specialUrl: "",
    },
    {
      problemText: "How to get cheaper shipping",
      answerText:
        "1. to shoebox and pack, use a compression bag\n2. rehearsal parcel, if the volumetric weight  and actual weight are smaller than before, the shipping fee will be relatively cheaper\n3. use available shipping coupon",
      specialUrl: "",
    },
  ];
  return list;
});
</script>
<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  color: #313131;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  text-align: start;
}
:deep(.el-collapse) {
  border-top: 0;
  background-color: #f8f8f8;
  .el-collapse-item {
    background-color: #f8f8f8;
    .el-collapse-item__wrap {
      background-color: #f8f8f8;
    }
    button {
      background-color: #f8f8f8;
    }
  }
}
.common-problems {
  width: 100%;
  background: #f8f8f8;
  padding: 60px 0 100px;
  box-sizing: border-box;

  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 80px;
  }

  .problem-content {
    width: 1200px;
    margin: 0 auto;

    .answer-content {
      color: #313131;
      font-size: 16px;
      font-weight: 700;
      white-space: pre-wrap;

      a {
        color: #ff2840;
      }
    }

    :deep(.ant-collapse-header) {
      color: #333;
      font-weight: 700;
      font-size: 22px;
    }
  }
}
@media screen and (max-width: 880px) {
  .common-problems {
    padding: 32px 20px;
    box-sizing: border-box;

    h1 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .problem-content {
      width: 100%;

      :deep(.ant-collapse-header) {
        font-weight: 700;
        font-size: 12px;
      }

      :deep(.answer-content) {
        font-size: 12px;
      }
    }
  }
}
</style>
