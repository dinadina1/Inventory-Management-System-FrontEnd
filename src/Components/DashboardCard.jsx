
const DashboardCard = ({ icon: Icon, color, content, value }) => {
  return (
    <div className="col-lg-4 col-md-6 col-12 mt-4">
      <div className="card box-shadow">
        <div className="card-content">
          <div className="card-body">
            <div className="media d-flex justify-content-between">
              <div className="align-self-center">
                <Icon className="font-large-2" style={{ color: color, fontSize: "100px" }} />
              </div>
              <div className="media-body pt-3">
                <h3 className="text-end">{value}</h3>
                <span style={{ fontWeight: "500" }}>{content}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
