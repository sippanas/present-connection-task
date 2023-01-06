const LoadingListItem = () => {
    return (
        <span
            className="placeholder-glow list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true">
            <span className="placeholder col-1 rounded-3" />
            <div className="d-flex gap-1 w-100 justify-content-between">
                <div className="placeholder rounded-3 my-auto mx-auto">
                    <h6>Make Model</h6>
                </div>
            </div>
        </span>
    );
};

export default LoadingListItem;