package expo.modules.divkit

import android.view.View
import com.yandex.div.core.DivCustomContainerViewAdapter
import com.yandex.div.core.state.DivStatePath
import com.yandex.div.core.view2.Div2View
import com.yandex.div.json.expressions.ExpressionResolver
import com.yandex.div2.DivCustom

class CustomViewAdapter() : DivCustomContainerViewAdapter {
    override fun bindView(view: View, div: DivCustom, divView: Div2View, expressionResolver: ExpressionResolver, path: DivStatePath) {
    }

    override fun createView(div: DivCustom, divView: Div2View, expressionResolver: ExpressionResolver, path: DivStatePath): View {
        val layout = CustomLayout(divView.context)
        val nativeViewId = div.customProps?.get("nativeViewId").toString()
        layout.tag = "custom$nativeViewId"
        return layout
    }

    override fun isCustomTypeSupported(type: String): Boolean = true

    override fun release(view: View, div: DivCustom) = Unit

}
