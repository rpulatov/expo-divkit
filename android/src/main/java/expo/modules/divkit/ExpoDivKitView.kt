package expo.modules.divkit

import android.content.Context
import android.util.DisplayMetrics
import android.view.ContextThemeWrapper
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.views.view.ReactViewGroup
import com.yandex.div.DivDataTag
import com.yandex.div.core.Div2Context
import com.yandex.div.core.DivConfiguration
import com.yandex.div.data.DivParsingEnvironment
import com.yandex.div.json.ParsingErrorLogger
import com.yandex.div2.DivData
import expo.modules.core.utilities.takeIfInstanceOf
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import org.json.JSONObject

class ExpoDivKitView(context: Context, appContext: AppContext) : ExpoView(context, appContext),
    View.OnLayoutChangeListener {
    private var mainView: MainDivView
    private val divContext: Div2Context
    private val onHeightChanged by EventDispatcher()

    private fun createDivConfiguration(): DivConfiguration {
        return DivConfiguration.Builder(ExpoDivImageLoader(context))
            .actionHandler(ExpoDivActionHandler(context))
            .divCustomContainerViewAdapter(CustomViewAdapter())
            .supportHyphenation(true)
            .visualErrorsEnabled(true)
            .build()
    }

    fun updateView(jsonData: JSONObject) {
        val templatesJson = jsonData.optJSONObject("templates")
        val cardJson = jsonData.optJSONObject("card")

        val parsingEnvironment =
            DivParsingEnvironment(ParsingErrorLogger.ASSERT).apply {
                if (templatesJson != null) parseTemplates(templatesJson)
            }

        val data = cardJson?.let { DivData(parsingEnvironment, it) }
        if (data != null) {
            mainView.setData(data, DivDataTag(data.logId))
        }
    }

    public fun onCustomViewRendered() {}

    override fun onViewAdded(child: View?) {
        super.onViewAdded(child)

        if (child is ReactViewGroup) {
            val tag = child.getTag(com.facebook.react.R.id.view_tag_native_id)
            val tagString = tag.takeIfInstanceOf<String>()
            val customViewParent = child.parent as ViewGroup
            customViewParent.removeView(child)
            if (tagString == null) return

            val customLayout =
                try {
                    findViewWithTag<CustomLayout>("custom$tagString")
                } catch (e: RuntimeException) {
                    null
                } ?: return

            customLayout.removeAllViews()
            customLayout.addView(
                child, ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
                )
            )
        }
    }

    override fun onLayoutChange(
        view: View,
        left: Int,
        top: Int,
        right: Int,
        bottom: Int,
        oldLeft: Int,
        oldTop: Int,
        oldRight: Int,
        oldBottom: Int
    ) {
        if (view == mainView) {
            val heightChanged = bottom - top != oldBottom - oldTop
            if (heightChanged) {
                val height = convertPixelsToDp(bottom - top, context)
                onHeightChanged(mapOf("height" to height))
            }
        }
    }

    private fun convertPixelsToDp(px: Int, context: Context): Float {
        return px / (context.resources.displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
    }

    init {
        layoutParams = LayoutParams(
            LayoutParams.MATCH_PARENT,
            LayoutParams.WRAP_CONTENT
        )

        val contextWrapper = ContextThemeWrapper(context, context.theme)

        divContext =
            Div2Context(
                baseContext = contextWrapper,
                configuration = createDivConfiguration(),
                lifecycleOwner = appContext.currentActivity as? LifecycleOwner
            )

        mainView = MainDivView(divContext).apply {
            layoutParams = LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.WRAP_CONTENT
            )
        }

        addView(mainView)
        mainView.addOnLayoutChangeListener(this)
    }
}

