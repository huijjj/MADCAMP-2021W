package com.example.ohmok;

import android.app.Application
import com.kakao.sdk.common.KakaoSdk

class GlobalApplication : Application() {
        override fun onCreate() {
        super.onCreate()

        KakaoSdk.init(this, "9f9345bf29987da815aef9ed7df70b4e")
        }
}