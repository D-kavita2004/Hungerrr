import "../styles/shimmer.css";

const ShimmerUI = ()=>{
   return (
      <div id ="shimmer-area">
            <div id="shimmer-container">
              {
                  Array.from({length:20}).map((_)=>{
                     return <div className="shimmer-card"></div>
                  })
              }
            </div>
      </div>
   )
}
export default ShimmerUI;