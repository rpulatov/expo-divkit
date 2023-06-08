package expo.modules.divkit

import android.content.Context
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout


class CustomLayout(context: Context) : LinearLayout(context), View.OnLayoutChangeListener {

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
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
        if (view == getChildAt(0)) {
            val width = right - left
            val height = bottom - top

            val widthChanged = width != oldRight - oldLeft
            val heightChanged = height != oldBottom - oldTop

            if (widthChanged || heightChanged) {
                onNestedViewSizeChanged(view)
            }
        }
    }

    private fun onNestedViewSizeChanged(nestedView: View) {
        layoutParams.height = nestedView.height
        requestLayout()
    }

    override fun addView(child: View, params: ViewGroup.LayoutParams) {
        super.addView(child, params)
        child.addOnLayoutChangeListener(this)
    }

    init {
        layoutParams =
            ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
        orientation = VERTICAL
    }
}
