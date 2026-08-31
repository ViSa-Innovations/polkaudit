export default function DataVisuals() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Data Visualization Style</h2>
        <p className="text-muted-foreground">
          Guidelines for displaying data, metrics, and charts in PolkAudit interfaces.
        </p>
      </div>

      {/* Metric Cards */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Metric Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Total Audits</p>
            <p className="text-3xl font-bold text-foreground mt-2">1,247</p>
            <p className="text-xs text-green-600 mt-1">↑ 12% this month</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Completion Rate</p>
            <p className="text-3xl font-bold text-foreground mt-2">94%</p>
            <p className="text-xs text-muted-foreground mt-1">↓ 2% vs last month</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Avg Response</p>
            <p className="text-3xl font-bold text-accent mt-2">2.3h</p>
            <p className="text-xs text-green-600 mt-1">↑ Faster than usual</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Active Users</p>
            <p className="text-3xl font-bold text-foreground mt-2">542</p>
            <p className="text-xs text-muted-foreground mt-1">Across all teams</p>
          </div>
        </div>
      </div>

      {/* Chart Placeholder Styles */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Chart Styles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Line Chart */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-sm font-semibold text-foreground mb-4">Line Chart</p>
            <div className="space-y-2 h-32 flex flex-col justify-end gap-2">
              <div className="flex items-end justify-between gap-1">
                {[40, 60, 45, 75, 65, 80, 70].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-accent to-accent/40 rounded-sm"
                    style={{ height: `${(height / 100) * 100}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Use accent color with gradient for visual interest</p>
          </div>

          {/* Progress Bar */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-sm font-semibold text-foreground mb-4">Progress Indicators</p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Complete</span>
                  <span className="font-semibold text-foreground">75%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-accent rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">In Progress</span>
                  <span className="font-semibold text-foreground">45%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-sm font-semibold text-foreground mb-4">Pie / Donut Chart</p>
            <div className="flex items-center justify-center h-32">
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(
                    #7c3aed 0deg 144deg,
                    #6d28d9 144deg 216deg,
                    #1f2937 216deg 360deg
                  )`
                }}>
                <div className="w-12 h-12 rounded-full bg-card"></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Use accent colors for segments</p>
          </div>

          {/* Status List */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <p className="text-sm font-semibold text-foreground mb-4">Status List</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                <span className="text-xs text-muted-foreground">Active - 234</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                <span className="text-xs text-muted-foreground">Pending - 89</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <span className="text-xs text-muted-foreground">Failed - 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Tables</h3>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Audit ID</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Progress</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#AU-001', status: 'Completed', progress: 100 },
                { id: '#AU-002', status: 'In Progress', progress: 65 },
                { id: '#AU-003', status: 'Pending', progress: 0 },
              ].map(row => (
                <tr key={row.id} className="border-b border-border hover:bg-card transition-colors">
                  <td className="px-4 py-3 font-mono text-accent">{row.id}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      row.status === 'Completed' ? 'bg-green-900/20 text-green-600' :
                      row.status === 'In Progress' ? 'bg-blue-900/20 text-blue-600' :
                      'bg-yellow-900/20 text-yellow-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${row.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">2024-07-15</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Icons & Indicators */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Icons & Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border text-center">
            <div className="text-3xl text-accent mb-2">→</div>
            <p className="text-xs text-muted-foreground">Trend Up</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border text-center">
            <div className="text-3xl text-red-600 mb-2">↓</div>
            <p className="text-xs text-muted-foreground">Trend Down</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-green-600/20 flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
            <p className="text-xs text-muted-foreground">Success</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-red-600/20 flex items-center justify-center">
              <span className="text-sm">✕</span>
            </div>
            <p className="text-xs text-muted-foreground">Error</p>
          </div>
        </div>
      </div>

      {/* Color Usage in Charts */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Color Palette for Charts</h3>
        <div className="p-6 rounded-lg bg-card border border-border">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground mb-3">Sequential (Use for single series):</p>
            <div className="flex gap-2">
              {['#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'].map((color, i) => (
                <div key={i} className="flex-1 h-12 rounded-lg border border-border" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Light to dark purple progression</p>
          </div>
          <div className="space-y-2 mt-6">
            <p className="text-sm font-semibold text-foreground mb-3">Categorical (Use for multiple series):</p>
            <div className="flex gap-2">
              {['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color, i) => (
                <div key={i} className="flex-1 h-12 rounded-lg border border-border" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Distinct colors for multiple data series</p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-green-900/10 border border-green-700/30 rounded-lg p-4">
        <p className="font-semibold text-green-600 mb-3">Data Visualization Best Practices</p>
        <ul className="text-sm text-green-700 space-y-1">
          <li>✓ Use accent and primary colors for highlights and main data</li>
          <li>✓ Keep charts minimal and focused - remove chartjunk</li>
          <li>✓ Include units and labels for clarity</li>
          <li>✓ Show comparison or trend context when possible</li>
          <li>✓ Use consistent color mapping across all visualizations</li>
          <li>✓ Ensure contrast is sufficient for all data points</li>
        </ul>
      </div>
    </div>
  )
}
