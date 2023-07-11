<script setup lang="ts">
import {
  addPatient,
  delPatient,
  editPatient,
  getPatientList
} from '@/service/user'
import { computed, ref } from 'vue'
import CpNavBar from '@/components/cp-nav-bar.vue'
import type { Patient, PatientList } from '@/types/user'
import { showConfirmDialog, showToast } from 'vant'
import Validator from 'id-validator'
import CpRadioBtn from '@/components/CpRadioBtn.vue'

const patientList = ref<PatientList>([])
const loadData = async () => {
  const res = await getPatientList()
  patientList.value = res.data
}
// 表单地默认初始值
const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 0,
  defaultFlag: 0
}
const patient = ref<Patient>({ ...initPatient })

// 提供一个计算属性，把数据里面的0或者1和表单的true false进行匹配
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 // 数字转化成boolean值，1 >> true  0 >> false
  },
  set(newState) {
    patient.value.defaultFlag = newState ? 1 : 0
  }
})

loadData()

const options = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 0
  }
]

const show = ref(false)
const showPopup = (item?: Patient) => {
  if (item) {
    //   数据回显
    const { id, name, idCard, gender, defaultFlag } = item
    // 如果是编辑场景，数据里面是有id的
    patient.value = { id, name, idCard, gender, defaultFlag }
  } else {
    //   直接赋值默认值
    // 弹层打开之前，把数据重置
    // patient
    patient.value = {
      ...initPatient
    }
  }
  show.value = true
}

/**
 * 删除患者信息
 */
const del = async () => {
  if (patient.value.id) {
    //   删除
    await showConfirmDialog({
      title: '温馨提示',
      message: `确定删除 ${patient.value.name} 的信息`
    })
    await delPatient(patient.value.id)
    showToast('删除成功')
    loadData()
    show.value = false
  }
}

const submit = async () => {
  //   校验姓名和身份证号码是否填写
  if (!patient.value.name) return showToast('请填写姓名')
  if (!patient.value.idCard) return showToast('请填写身份证号')
  const validator = new Validator()
  // 传入身份证号信息，可以校验身份证号是否符合规则
  const isValid = validator.isValid(patient.value.idCard)
  if (!isValid) return showToast('身份号格式不对')
  const { sex } = validator.getInfo(patient.value.idCard)
  if (sex !== patient.value.gender) return showToast('性别信息不正确')
  // 如果有id证明就是编辑 >> 调用编辑的接口
  patient.value.id
    ? await editPatient(patient.value)
    : await addPatient(patient.value)
  showToast(patient.value.id ? '编辑成功' : '添加患者成功')
  show.value = false // 关闭弹层
  loadData() // 重新获取列表数据
}
</script>
<template>
  <div class="patient-page">
    <!--    <CpRadioBtn v-model="gender" :options="options" />-->
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div class="patient-item" v-for="item in patientList" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">
            {{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}
          </span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="showPopup(item)">
          <cp-icon name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" @click="showPopup()">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <van-popup v-model:show="show" position="right">
      <CpNavBar
        :back="() => (show = !show)"
        :title="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        @click-right="submit"
      />
      <van-form autocomplete="off">
        <van-field
          v-model="patient.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
        />
        <van-field
          v-model="patient.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
        />
        <van-field label="性别">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn
              v-model="patient.gender"
              :options="options"
            ></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" round />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="del">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  // 底部操作栏
  .van-action-bar {
    padding: 0 10px;
    margin-bottom: 10px;
    .van-button {
      color: var(--cp-price);
      background-color: var(--cp-bg);
    }
  }

  padding: 46px 0 80px;
  ::v-deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
</style>
