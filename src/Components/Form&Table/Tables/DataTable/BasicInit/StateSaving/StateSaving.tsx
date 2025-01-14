import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Input, Label } from "reactstrap";
import { StateSavingCardHeader } from "./StateSavingCardHeader";
import { useMemo, useState } from "react";
import { StateSavingColumns, StateSavingDataList } from "@/Data/Form&Table/Table/DataTable/BasicInitData";
import { SearchTableButton } from "@/Constant";

const StateSaving = () => {
  const [filterText, setFilterText] = useState("");

  const TableRecordSearch = StateSavingDataList.filter((item) => {
    return Object.values(item).some((value) => String(value).toLowerCase().includes(filterText.toLowerCase()));
  });

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div id="basic-9_filter" className="dataTables_filter d-flex align-items-center">
        <Label className="me-2">{SearchTableButton}:</Label>
        <Input onChange={(e) => setFilterText(e.target.value)} type="search" value={filterText} />
      </div>
    );
  }, [filterText]);

  return (
    <Col sm="12">
      <Card>
        <StateSavingCardHeader />
        <CardBody>
          <div className="table-responsive state-saving">
            <DataTable className="custom-scrollbar" data={TableRecordSearch} columns={StateSavingColumns} striped pagination subHeader subHeaderComponent={subHeaderComponentMemo} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default StateSaving;
