<script>
const supabase = createClient(
  "https://mhtfjfvcrwfuucukorvb.supabase.co",
  process.env.SUPABASE_KEY
);

const client = supabase.createClient(
  "https://mhtfjfvcrwfuucukorvb.supabase.co",
  "sb_secret_5n9fUoo9XyoQDP_Wnd7huQ_mAxZrvZp"
);

async function loadDailyPrices() {
  const { data, error } = await client
    .from("pdf_sources")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  const container = document.getElementById("dailyPriceTable");

  let grouped = {};

  // ✅ Group by date
  data.forEach(item => {
    if (!grouped[item.date]) {
      grouped[item.date] = [];
    }
    grouped[item.date].push(item);
  });

  // ✅ Render grouped UI
  container.innerHTML = Object.keys(grouped).map(date => {

    return `
      <div class="mb-4 border border-slate-800 rounded-lg">

        <!-- DATE HEADER -->
        <div class="bg-slate-900 px-3 py-2 font-bold text-green-400">
          📅 ${date}
        </div>

        <!-- FILES -->
        ${grouped[date].map(item => {

          let statusColor = item.status === "approved" ? "text-green-400" : "text-yellow-400";
          let priceColor = item.price_status === "updated" ? "text-green-400" : "text-slate-400";

          return `
            <div class="grid grid-cols-12 px-3 py-2 border-t border-slate-800 text-sm">

              <div class="col-span-3">
                <a href="${item.file_url}" target="_blank" class="text-blue-400 underline">
                  ${item.title}
                </a>
              </div>

              <div class="col-span-2 ${statusColor}">
                ${item.status}
              </div>

              <div class="col-span-2 ${priceColor}">
                ${item.price_status}
              </div>

              <div class="col-span-5 flex gap-2">
                <button onclick="approve('${item.id}')" class="bg-green-600 px-2 py-1 rounded text-xs">Approve</button>
                <button onclick="markUpdated('${item.id}')" class="bg-blue-600 px-2 py-1 rounded text-xs">Price Updated</button>
              </div>

            </div>
          `;
        }).join("")}

      </div>
    `;
  }).join("");
}

async function approve(id) {
  await client.from("pdf_sources")
    .update({ status: "approved" })
    .eq("id", id);

  loadDailyPrices();
}

async function markUpdated(id) {
  await client.from("pdf_sources")
    .update({ price_status: "updated" })
    .eq("id", id);

  loadDailyPrices();
}

loadDailyPrices();
</script>