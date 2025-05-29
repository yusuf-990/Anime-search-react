const { useState, useEffect, useRef } = React;

function AnimeApp() {
  const [query, setQuery] = useState("Naruto"); // default awal

  return (
    <div>
      <SearchAnimeButton setQuery={setQuery} />
      <RenderFetch query={query} />
    </div>
  );
}

function RenderFetch({ query }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        let link = "https://api.jikan.moe/v4/anime?sfw=1&q=";
        let response = await fetch(link + query);
        let result = await response.json();
        setData(result.data);
      } catch (err) {
        console.error("Gagal fetch anime:", err);
      }
    };

    fetchAnime();
  }, [query]); // re-fetch setiap query berubah

  return (
    <div>
      <div className="row justify-content-center">
        {data.map((x) => (
          <CardAnime data={x} key={x.mal_id} />
        ))}
      </div>

      {data.map((x) => (
        <ModalAnime data={x} key={`modal-${x.mal_id}`} />
      ))}
    </div>
  );
}

function SearchAnimeButton({ setQuery }) {
  const animeInput = useRef();

  return (
    <div className="sticky-md-top bg-white pt-2" style={{ zIndex: 1020 }}>
      <div className="container">
        <div className="row align-items-center justify-content-between text-center text-md-start">
          <div className="col-md-4 mb-md-0 mb-3">
            <h1 className="m-0 text-primary">Mills Anime</h1>
          </div>

          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Anime..."
                ref={animeInput}
              />
              <button
                className="btn btn-outline-secondary bg-primary text-white"
                type="button"
                onClick={() => {
                  const inputVal = animeInput.current.value;
                  setQuery(inputVal);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardAnime({ data }) {
  let imageLink = data.images.jpg?.image_url || "tidak ada";
  return (
    <div
      className="card mx-2 my-2 border border-warning bg-secondary text-light"
      style={{ width: "18rem" }}
    >
      <img
        src={imageLink}
        className="card-img-top"
        style={{ height: "350px", width: "100%" }}
        alt={data.title}
      />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <div className="card-text">
          <div className="row">
            <dt className="col-6">Score</dt>
            <dd className="col-6">:{data.score}</dd>
          </div>
          <div className="row">
            <dt className="col-6">Mal Id</dt>
            <dd className="col-6">:{data.mal_id}</dd>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#anime${data.mal_id}`}
        >
          Detail
        </button>
      </div>
    </div>
  );
}

function ModalAnime({ data }) {
  let imageLink = data.images.jpg?.image_url || "tidak ada";
  return (
    <div
      className="modal fade"
      id={`anime${data.mal_id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={data.mal_id}>
              {data.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <img
                src={imageLink}
                className=" col-md-4 col-5 justify-content-center img-fluid"
                style={{ maxHeight: "350px" }}
                alt={data.title}
              />
              <div className="col-md-8">
                <dl className="row">
                  <dt className="col-3">Title</dt>
                  <dd className="col-9">
                    <strong>:</strong>
                    {data.title}
                  </dd>

                  <dt className="col-3">Score</dt>
                  <dd className="col-9">
                    <strong>:</strong>
                    {data.score}
                  </dd>

                  <dt className="col-3">Mal Id</dt>
                  <dd className="col-9">
                    <strong>:</strong>
                    {data.mal_id}
                  </dd>

                  <dt className="col-sm-3 text-truncate">
                    Synopsis<strong>:</strong>
                  </dt>
                  <dd className="col-sm-9">{data.synopsis}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AnimeApp />
  </>
);
