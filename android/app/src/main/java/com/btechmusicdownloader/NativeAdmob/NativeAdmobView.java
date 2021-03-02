package com.btechmusicdownloader.NativeAdmob;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;

import com.btechmusicdownloader.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.google.android.ads.nativetemplates.NativeTemplateStyle;
import com.google.android.ads.nativetemplates.TemplateView;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdLoader;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.formats.NativeAdOptions;
import com.google.android.gms.ads.formats.UnifiedNativeAd;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;


public class NativeAdmobView extends SimpleViewManager<LinearLayout> {

    ReactApplicationContext mContext;

    @NonNull
    @Override
    public String getName() {
        return "NativeAdmobView";
    }

    public NativeAdmobView(ReactApplicationContext reactContext) {
        mContext = reactContext;
        MobileAds.initialize(reactContext, new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {

            }
        });
    }

    @NonNull
    @Override
    protected LinearLayout createViewInstance(@NonNull ThemedReactContext reactContext) {
        LayoutInflater inflater = LayoutInflater.from(reactContext);
        LinearLayout view = (LinearLayout) inflater.inflate(R.layout.layout_admob, null, false);
        view.setVisibility(View.GONE);
        loadAd(reactContext, view);
        return view;
    }

    void loadAd(Context reactContext, View view) {
        AdLoader adLoader = new AdLoader.Builder(reactContext, "ca-app-pub-3940256099942544/2247696110")
                .forUnifiedNativeAd(new UnifiedNativeAd.OnUnifiedNativeAdLoadedListener() {
                    @Override
                    public void onUnifiedNativeAdLoaded(UnifiedNativeAd unifiedNativeAd) {
                        Log.d("load", "success");
                        mContext.runOnUiQueueThread(new Runnable() {
                            @Override
                            public void run() {
                                NativeTemplateStyle styles = new
                                        NativeTemplateStyle.Builder().build();
                                TemplateView template = view.findViewById(R.id.my_template);
                                template.setStyles(styles);
                                template.setNativeAd(unifiedNativeAd);
                                view.setVisibility(View.VISIBLE);
                            }
                        });
                    }
                })
                .withAdListener(new AdListener() {
                    @Override
                    public void onAdFailedToLoad(int errorCode) {
                        // Handle the failure by logging, altering the UI, and so on.
                    }

                    @Override
                    public void onAdClicked() {
                        super.onAdClicked();
                    }
                })
                .withNativeAdOptions(new NativeAdOptions.Builder()
                        // Methods in the NativeAdOptions.Builder class can be
                        // used here to specify individual options settings.
                        .build())
                .build();

        adLoader.loadAd(new AdRequest.Builder().build());
    }

}
