namespace PCTask.Data.Dtos
{
    public class VehicleQueryParameters
    {
        private int _pageSize = 10;
        private int _maxPageSize = 20;
        private string _orderByField = "Make";
        private bool _orderByAsc = true;

        public int PageNumber { get; set; } = 1;
        public int PageSize 
        { 
            get { return _pageSize; }
            set
            {
                _pageSize = (value > _maxPageSize) ? _maxPageSize : value;
            }
        }

        public string OrderByField
        {
            get { return _orderByField; }
            set { _orderByField = value; }
        }

        public bool OrderByAsc
        { 
            get { return _orderByAsc; }
            set { _orderByAsc = value; }
        }
    }
}
