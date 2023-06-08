package expo.modules.divkit


import org.json.JSONObject
import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.view.ContextThemeWrapper
import android.webkit.WebView
import android.webkit.WebViewClient
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.LinearLayoutManager

import com.yandex.div.core.Div2Context
import com.yandex.div.core.DivActionHandler
import com.yandex.div.core.DivConfiguration
import com.yandex.div.core.DivViewFacade
import com.yandex.div2.DivAction

class ExpoDivKitView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val assetReader = AssetReader(context)

  class DemoDivActionHandler: DivActionHandler() {
        override fun handleAction(action: DivAction, view: DivViewFacade): Boolean {
            return super.handleAction(action, view)
        }
  }

  fun createDivConfiguration(): DivConfiguration {
        return DivConfiguration.Builder(DemoDivImageLoader(context))
            .actionHandler(DemoDivActionHandler())
            .supportHyphenation(true)
            .visualErrorsEnabled(true)
            .build()
  }

  fun updateView(jsonData: JSONObject) {
    val templatesJson = jsonData.optJSONObject("templates")
    val cardsJson = jsonData.getJSONArray("cards")

    val contextWrapper = ContextThemeWrapper(context, context.theme)
    val recyclerView = RecyclerView(contextWrapper);

    val divContext = Div2Context(baseContext = contextWrapper, configuration = createDivConfiguration())
    val listAdapter = DivListAdapter(divContext, templatesJson, cardsJson)

    recyclerView.apply {
      layoutManager = LinearLayoutManager(contextWrapper)
      adapter = listAdapter
    }

    addView(recyclerView)
  }

  init {

    

    
    
    
  }
}
