package expo.modules.divkit

import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat
import com.yandex.div.core.DivActionHandler
import com.yandex.div.core.DivViewFacade
import com.yandex.div.json.expressions.ExpressionResolver
import com.yandex.div2.DivAction

class ExpoDivActionHandler(private val context: Context) : DivActionHandler() {

    private val SCHEME_DIV_ACTION = "div-action"

    override fun handleAction(action: DivAction, view: DivViewFacade, resolver: ExpressionResolver): Boolean {
        val uri = (if (action.url != null) action.url!!.evaluate(view.expressionResolver) else null)
                ?: return false
        if (SCHEME_DIV_ACTION == uri.scheme) {
            return super.handleAction(action, view, resolver)
        }
        val intent = Intent(Intent.ACTION_VIEW, uri)
        ContextCompat.startActivity(context, intent, null)
        return true
    }
}