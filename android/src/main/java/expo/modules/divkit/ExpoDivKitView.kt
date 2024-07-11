package expo.modules.divkit

import android.annotation.SuppressLint
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
import com.yandex.div.core.view2.Div2View
import com.yandex.div.data.DivParsingEnvironment
import com.yandex.div.json.ParsingErrorLogger
import com.yandex.div2.DivData
import expo.modules.core.utilities.takeIfInstanceOf
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import org.json.JSONObject

@SuppressLint("ViewConstructor")
class ExpoDivKitView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    private var div2View: Div2View
    private val divContext: Div2Context
    private val onHeightChanged by EventDispatcher()

    init {
        orientation = VERTICAL
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

        div2View = Div2View(divContext).apply {
            layoutParams = LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.WRAP_CONTENT
            )
        }

        addView(div2View)
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, MeasureSpec.UNSPECIFIED)
        val height = convertPixelsToDp(measuredHeight, context)
        onHeightChanged(mapOf("height" to height))
    }


    fun setLayoutHeightParam(param: Float) {
        if (param.toInt() == LayoutParams.WRAP_CONTENT || param.toInt() == LayoutParams.MATCH_PARENT) {
            div2View.layoutParams.height = param.toInt()
        } else {
            div2View.layoutParams.height = convertDpToPixels(param,context)
        }
    }

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
            div2View.setData(data, DivDataTag(data.logId))
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

    private fun convertPixelsToDp(px: Int, context: Context): Float {
        return px / (context.resources.displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
    }

    private fun convertDpToPixels(dp: Float, context: Context): Int {
        return (dp * (context.resources.displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)).toInt()
    }
}

