export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <section className="container mx-auto h-[60vh] lg:h-[80vh] bg-slate-50">
      <div className="flex flex-col justify-center items-center h-[100%] w-[100%]">
        <div>
          <h1 className="h3">İşlem yapılıyor</h1>
        </div>
      </div>
    </section>
  );
}
