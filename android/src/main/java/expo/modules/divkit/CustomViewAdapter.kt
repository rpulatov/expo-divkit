package expo.modules.divkit

import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.LinearLayout.VERTICAL
import android.widget.TextView
import com.yandex.div.core.DivCustomViewAdapter
import com.yandex.div.core.view2.Div2View
import com.yandex.div2.DivCustom

class CustomViewAdapter(parentView: ExpoDivKitView) : DivCustomViewAdapter {

    private var _parentView = parentView

    override fun isCustomTypeSupported(type: String): Boolean = true

    override fun release(view: View, div: DivCustom) = Unit

    override fun createView(div: DivCustom, divView: Div2View): View {
        val layout =
                LinearLayout(divView.context).apply {
                    layoutParams =
                            ViewGroup.LayoutParams(
                                    ViewGroup.LayoutParams.MATCH_PARENT,
                                    ViewGroup.LayoutParams.WRAP_CONTENT
                            )
                    orientation = VERTICAL
                }

        val tag = "custom" + View.generateViewId().toString()
        layout.tag = tag
        _parentView.sendRequestToRenderCustomView(tag, div.customType)

//        val text = TextView(divView.context).apply {
//            layoutParams =
//                ViewGroup.LayoutParams(
//                    ViewGroup.LayoutParams.MATCH_PARENT,
//                    ViewGroup.LayoutParams.WRAP_CONTENT
//                )
//        }
//        text.text = "TEST ANDROID RENDER "
//
//        layout.addView(text)

        return layout
    }

    override fun bindView(customView: View, div: DivCustom, divView: Div2View) {}
}
