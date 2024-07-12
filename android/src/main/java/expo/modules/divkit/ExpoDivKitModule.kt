package expo.modules.divkit

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.UIManagerModule
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.json.JSONObject

class ExpoDivKitModule : Module() {

    override fun definition() = ModuleDefinition {
        Name("ExpoDivKit")

        Function("onCustomViewRendered") { node: Int ->
            val rnContext = appContext.reactContext as? ReactApplicationContext ?: return@Function
            val uiManager =
                rnContext.getNativeModule(UIManagerModule::class.java) ?: return@Function
            appContext.activityProvider?.currentActivity?.runOnUiThread {
                val view = uiManager.resolveView(node) as ExpoDivKitView
                view.onCustomViewRendered()
            }
        }

        View(
            ExpoDivKitView::class,
        ) {
            Events("onHeightChanged")

            Prop("json") { view: ExpoDivKitView, json: ReadableMap ->
                view.updateView(JSONObject(json.toHashMap()))
            }

            Prop("layoutHeight") { view: ExpoDivKitView, layoutHeight: Float ->
                view.setLayoutHeightParam(layoutHeight)
            }

            Prop("variables") { view: ExpoDivKitView, variables: ReadableMap ->
                view.setVariables(variables)
            }


        }
    }
}
