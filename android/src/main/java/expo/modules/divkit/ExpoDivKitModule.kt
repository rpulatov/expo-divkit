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

            Prop("safeAreaInsets") { view: ExpoDivKitView, insets: ReadableMap ->
                insets?.let {
                    view.setSafeAreaInsets(
                        it.getDouble("top") ?: 0,
                        insets.getDouble("bottom") ?: 0,
                        insets.getDouble("left") ?: 0,
                        insets.getDouble("right") ?: 0
                    )
                }
            }
        }
    }
}
