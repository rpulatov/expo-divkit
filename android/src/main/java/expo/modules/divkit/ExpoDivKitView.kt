package expo.modules.divkit

import android.content.Context
import android.graphics.drawable.GradientDrawable
import android.os.Build
import android.view.ContextThemeWrapper
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import com.yandex.div.DivDataTag
import com.yandex.div.core.Div2Context
import com.yandex.div.core.DivActionHandler
import com.yandex.div.core.DivConfiguration
import com.yandex.div.core.DivViewFacade
import com.yandex.div.core.view2.Div2View
import com.yandex.div.data.DivParsingEnvironment
import com.yandex.div.json.ParsingErrorLogger
import com.yandex.div2.DivAction
import com.yandex.div2.DivData
import expo.modules.core.utilities.takeIfInstanceOf
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import org.json.JSONObject


class ExpoDivKitView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val assetReader = AssetReader(context)
  //  private val recyclerView: RecyclerView
  private val mainView: Div2View
  private val divContext: Div2Context
  private val onRenderCustomViewRequested by EventDispatcher()


  class DemoDivActionHandler : DivActionHandler() {
    override fun handleAction(action: DivAction, view: DivViewFacade): Boolean {
      return super.handleAction(action, view)
    }
  }

  private fun createDivConfiguration(): DivConfiguration {
    return DivConfiguration.Builder(DemoDivImageLoader(context))
        .actionHandler(DemoDivActionHandler())
        .divCustomViewAdapter(CustomViewAdapter(this))
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

    val divData = DivData(parsingEnvironment, cardJson)
    mainView.setData(divData, DivDataTag(divData.logId))
    //    recyclerView.adapter = DivListAdapter(divContext, templatesJson, cardsJson)

  }

  fun sendRequestToRenderCustomView(customViewId: String, customType: String) {
    onRenderCustomViewRequested(mapOf("nativeViewId" to customViewId, "customType" to customType))
  }

  override fun onViewAdded(child: View?) {
    super.onViewAdded(child)

    if (child == null || mainView == child) return

    val tag = child.getTag(R.id.view_tag_native_id)
    val tagString = tag.takeIfInstanceOf<String>()

    val layoutCustomView =
        try {
          this.findViewWithTag<LinearLayout>(tagString)
        } catch (e: RuntimeException) {
          null
        } ?: return

    if (layoutCustomView == this) return
    /*
        val placeholderParent = layoutCustomView.parent as ViewGroup
        val index = placeholderParent.indexOfChild(layoutCustomView)
        placeholderParent.removeView(layoutCustomView);
    */
    val customViewParent = child.parent as ViewGroup
    customViewParent.removeView(child)

    //    placeholderParent.addView(child,index)
    //    this.detachViewFromParent(child)


      val text = TextView(context)
      text.text = "TEST ANDROID RENDER 4"
      text.layoutParams = ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT)



      // layoutCustomView.removeAllViews()

//      layoutCustomView.addView(text)

//      (layoutCustomView.parent as ViewGroup).layoutParams.height = 500


     layoutCustomView.addView(child)
/*
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
          layoutCustomView.forceHasOverlappingRendering(true)
      }*/
  }

  override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    super.onLayout(changed, l, t, r, b)
  }

  init {
    val contextWrapper =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          ContextThemeWrapper(context, context.theme)
        } else {
          context as ContextThemeWrapper
        }
    divContext = Div2Context(baseContext = contextWrapper, configuration = createDivConfiguration())

    mainView =
        Div2View(divContext).apply {
          layoutParams =
              ViewGroup.LayoutParams(
                  ViewGroup.LayoutParams.MATCH_PARENT,
                  ViewGroup.LayoutParams.WRAP_CONTENT
              )
        }

    //    recyclerView = RecyclerView(contextWrapper)
    //    recyclerView.layoutManager = LinearLayoutManager(contextWrapper)

    //    addView(recyclerView)
    addView(mainView)
  }
}
