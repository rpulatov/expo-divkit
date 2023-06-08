package expo.modules.divkit

import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.Adapter
import com.yandex.div.DivDataTag
import com.yandex.div.core.Div2Context
import com.yandex.div.core.view2.Div2View
import com.yandex.div.data.DivParsingEnvironment
import com.yandex.div.json.ParsingErrorLogger
import com.yandex.div2.DivData
import org.json.JSONArray
import org.json.JSONObject


internal class DivListAdapter(
    private val context: Div2Context,
    private val templatesJson: JSONObject? = null,
    private val cardsJson: JSONArray
) : Adapter<DivViewHolder>() {

    private val parsingEnvironment = DivParsingEnvironment(ParsingErrorLogger.ASSERT).apply {
        if (templatesJson != null) parseTemplates(templatesJson)
    }

    // create view by same cards
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DivViewHolder {
        val view = Div2View(context).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
        }
        return DivViewHolder(view, parsingEnvironment)
    }

    //  get data by array index
    override fun onBindViewHolder(holder: DivViewHolder, position: Int) {
        holder.bindJsonToView(cardsJson.getJSONObject(position))
    }

    override fun getItemCount(): Int = cardsJson.length()
}

// bind data to view
internal class DivViewHolder(
    private val divView: Div2View,
    private val parsingEnvironment: DivParsingEnvironment
) : RecyclerView.ViewHolder(divView) {

    fun bindJsonToView(cardJson: JSONObject) {
        val divData = DivData(parsingEnvironment, cardJson)
        divView.setData(divData, DivDataTag(divData.logId))
    }
}