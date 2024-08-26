#import "AppDelegate.h"
#import "RNBootSplash.h"

#import <CodePush/CodePush.h>
#import <React/RCTBundleURLProvider.h>

#import <OneSignalExtension/OneSignalExtension.h>
#import <OneSignalFramework/OneSignalFramework.h>
//#import <OneSignalLiveActivities/OneSignalLiveActivities.h>
//#import <OneSignalLiveActivities/OneSignalLiveActivities-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"distimer";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  [OneSignal.Debug setLogLevel:ONE_S_LL_VERBOSE];
  
  [OneSignal initialize:@"YOUR_ONESIGNAL_APP_ID" withLaunchOptions:launchOptions];
  
  [OneSignal.Notifications requestPermission:^(BOOL accepted) {
    NSLog(@"User accepted notifications: %d", accepted);
  } fallbackToSettings:true];
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

- (void)customizeRootView:(RCTRootView *)rootView {
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // ⬅️ initialize the splash screen
}

@end
