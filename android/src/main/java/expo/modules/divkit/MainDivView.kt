package expo.modules.divkit

import android.view.ViewGroup
import com.yandex.div.core.Div2Context
import com.yandex.div.core.view2.Div2View

class MainDivView(
    context: Div2Context,
) : Div2View(context) {
    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, MeasureSpec.UNSPECIFIED)
    }

    init {
        layoutParams =
            ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
    }
}
