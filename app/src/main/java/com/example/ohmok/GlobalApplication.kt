package com.example.ohmok;

import android.app.Application
import com.kakao.sdk.common.KakaoSdk

class GlobalApplication : Application() {
        override fun onCreate() {
        super.onCreate()

        KakaoSdk.init(this, "22b13f03ae9ccd9813bf810bc2dc47f4")
        }
}