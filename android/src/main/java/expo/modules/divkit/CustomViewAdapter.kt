package expo.modules.divkit

import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout.VERTICAL
import com.yandex.div.core.DivCustomViewAdapter
import com.yandex.div.core.view2.Div2View
import com.yandex.div2.DivCustom

class CustomViewAdapter() : DivCustomViewAdapter {
    override fun isCustomTypeSupported(type: String): Boolean = true

    override fun release(view: View, div: DivCustom) = Unit

    override fun createView(div: DivCustom, divView: Div2View): View {
        val layout = CustomLayout(divView.context)
        var nativeViewId = div.customProps?.get("nativeViewId").toString()
        layout.tag = "custom$nativeViewId"
        return layout
    }

    override fun bindView(customLayout: View, div: DivCustom, divView: Div2View) {
    }
}
