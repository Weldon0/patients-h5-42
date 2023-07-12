<script setup lang="ts">
import { IllnessTime } from '@/enum'
import { uploadImg } from '@/service/consult'
import { useConsultStore } from '@/stores'
import type { ConsultIllness } from '@/types/consult'
import { showToast } from 'vant'
import type {
  UploaderAfterRead,
  UploaderFileListItem
} from 'vant/lib/uploader/types'
import { computed } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const consultStore = useConsultStore()
const router = useRouter()

const timeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '大于半年', value: IllnessTime.More }
]
const flagOptions = [
  { label: '就诊过', value: 0 },
  { label: '没就诊过', value: 1 }
]

// 构建一个表单数据
const illness = ref<ConsultIllness>({
  illnessDesc: '', // 病情描述
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

const fileList = ref([])
const afterRead: UploaderAfterRead = async (item) => {
  // 判断是不是一个数组
  if (Array.isArray(item)) return
  if (!item.file) return
  // 修改loading状态
  item.status = 'uploading'
  item.message = '上传中'
  // 文件对象

  uploadImg(item.file)
    .then((res) => {
      // 上传的状态变为完成
      item.status = 'done'
      item.message = undefined
      item.url = res.data.url
      // 文件上传完毕之后，把后端返回的图片链接存储到illness的pictures里面
      illness.value.pictures?.push(res.data)
    })
    .catch(() => {
      // 上传的状态变为失败
      item.status = 'failed'
      item.message = '上传失败'
    })
}
// 删除图片的功能
const delImg = (item: UploaderFileListItem) => {
  // item里面会有一个url >> 后端返回的真实的图片存储地址
  //   把当前点击删除的图片，在illness里面找到之后给他过滤掉
  illness.value.pictures = illness.value.pictures?.filter(
    (sub) => sub.url !== item.url
  )
}

const next = () => {
  // 点击了页面的下一步的时候
  const { illnessDesc, illnessTime, consultFlag } = illness.value

  if (!illnessDesc) return showToast('请填写病情描述内容')
  if (illnessTime === undefined) return showToast('请选择就诊时间')
  if (consultFlag === undefined) return showToast('请选择是否就诊过')

  consultStore.setIllness(illness.value)
  //   跳转页面
  // 跳转档案管理，需要根据 isChange 实现选择功能
  router.push('/user/patient?isChange=1')
}
const disabled = computed(() => {
  // 病情描述  时间、是否去过医院
  return (
    !illness.value.illnessDesc ||
    illness.value.consultFlag === undefined ||
    illness.value.illnessTime === undefined
  )
})
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" /><span>内容仅医生可见</span>
        </p>
      </div>
    </div>

    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        v-model="illness.illnessDesc"
        placeholder="请输入病情描述信息"
      >
      </van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn
          :options="timeOptions"
          v-model="illness.illnessTime"
        ></cp-radio-btn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn
          :options="flagOptions"
          v-model="illness.consultFlag"
        ></cp-radio-btn>
      </div>
      <div class="illness-img">
        <van-uploader
          v-model="fileList"
          :max-count="9"
          :max-size="5 * 1024 * 1024"
          upload-icon="photo-o"
          upload-text="上传图片"
          :after-read="afterRead"
          @delete="delImg"
        ></van-uploader>
        <p class="tip">上传内容仅医生可见,最多9张图,最大5MB</p>
      </div>

      <van-button :class="{ disabled }" @click="next" type="primary" block round
        >下一步</van-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}

.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}

.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}

.consult-illness-page {
  padding-top: 46px;
  .illness-tip {
    display: flex;
    padding: 15px;
    .img {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 10px;
    }
    .info {
      flex: 1;
      padding-left: 12px;
      .tit {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .tip {
        padding: 12px;
        background: var(--cp-bg);
        color: var(--cp-text3);
        font-size: 13px;
        margin-bottom: 10px;
      }
      .safe {
        font-size: 10px;
        color: var(--cp-text3);
        display: flex;
        align-items: center;
        .cp-icon {
          font-size: 12px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
