package expo.modules.divkit

import android.view.View
import com.facebook.react.bridge.ReadableMap
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.json.JSONObject

class ExpoDivKitModule : Module() {

  // private val context: Context
  //   get() = requireNotNull(appContext.reactContext) { "React Application Context is null" }

  // private val currentActivity
  //   get() = appContext.activityProvider?.currentActivity ?: throw
  // MissingCurrentActivityException()

  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a
    // string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for
    // clarity.
    // The module will be accessible from `requireNativeModule('ExpoDivKit')` in JavaScript.
    Name("ExpoDivKit")

    Function("getTheme") {
      return@Function "system"
    }

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a
    // dictionary.
    Constants("PI" to Math.PI)

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") { "Hello world! 👋" }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf("value" to value))
    }

    View(
        ExpoDivKitView::class,
    ) {
      Prop("json") { view: ExpoDivKitView, json: ReadableMap ->
        view.updateView(JSONObject(json.toHashMap()))
      }

      // Prop("customViews") { view: ExpoDivKitView, customViews: ReadableArray? ->
      //   val reactNativeViewId = requireNotNull(customViews).getInt(0)
      //   view.createFragment(reactNativeViewId)
      // }

      Events("onRenderCustomViewRequested")
    }
  }
}
