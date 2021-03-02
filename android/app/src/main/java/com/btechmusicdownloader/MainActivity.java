package com.btechmusicdownloader;

import android.util.Log;

import com.facebook.react.ReactActivity;
import com.zmxv.RNSound.RNSoundModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "BaseProject";
  }

  @Override
  protected void onDestroy() {
    Log.d("out","out");
    if(RNSoundModule.mediaPlayer != null)
    RNSoundModule.mediaPlayer.stop();
    super.onDestroy();
  }
}
