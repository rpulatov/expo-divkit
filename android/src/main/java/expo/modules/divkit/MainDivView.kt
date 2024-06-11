package expo.modules.divkit

import android.annotation.SuppressLint
import android.view.ViewGroup
import com.yandex.div.core.Div2Context
import com.yandex.div.core.view2.Div2View

@SuppressLint("ViewConstructor")
class MainDivView(
    context: Div2Context,
) : Div2View(context) {
    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, MeasureSpec.UNSPECIFIED)
    }
}
