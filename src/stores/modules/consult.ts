import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PartialConsult } from '@/types/consult'
import type { ConsultType } from '@/enum'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    //     定义一个变量存储所有的极速问诊流程里面的数据
    const consult = ref<PartialConsult>({})

    //   1、设置问诊类型
    const setType = (type: ConsultType) => {
      consult.value.type = type
    }

    //   2、这是快速问诊类型
    const setIllnessType = (illnessType: 0 | 1) =>
      (consult.value.illnessType = illnessType)

    //     3、科室id
    const setDepId = (id: string) => (consult.value.id = id)

    //     4、设置疾病数据
    const setIllness = (
      illness: Pick<
        PartialConsult,
        'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
      >
    ) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }

    const setPatientId = (id: string) => (consult.value.patientId = id)
    const setCouponId = (id: string) => (consult.value.couponId = id)

    //     清除数据
    const clear = () => (consult.value = {})
    return {
      setType,
      setIllness,
      consult,
      setCouponId,
      setPatientId,
      clear,
      setDepId,
      setIllnessType
    }
  },
  {
    persist: true // 开启本次存储功能
  }
)
