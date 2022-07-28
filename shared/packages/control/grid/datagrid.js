import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { colors, TextField, withStyles } from "@material-ui/core";
import { Height } from '@material-ui/icons';
const styles = () => ({
    root: {
        // '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        //     outline: 'none !important',
        // },
        // "& .MuiDataGrid-renderingZone": {
        //     maxHeight: "none !important",
        //     minHeight: "auto !important",
        // },
        // "& .MuiDataGrid-row": {
        //     maxHeight: "none !important",
        //     minHeight: "auto !important",
        //     height: "30px",
        // },
        // "& . MuiDataGrid-cell": {
        //     maxHeight: "none !important",
        //     minHeight: "auto !important",
        //     height: "30px",
        // },
        // "& .MuiDataGrid-columnsContainer": {
        //     height: "30px",
        //     maxHeight: "none !important",
        //     minHeight: "auto !important",
        // }
    }
});
function DataGridControl({ rows, columns, pageSize, ...rest }) {
    const [pageSizeProps, setPageSizeProps] = React.useState(pageSize ?? 5);
    // https://mui.com/api/data-grid/data-grid/
    // filter custom
    // https://mui.com/components/data-grid/filtering/
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={45}
            headerHeight={45}
            pageSize={pageSizeProps}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            onPageSizeChange={(newPageSize) => setPageSizeProps(newPageSize)}
            localeText={{
                toolbarDensity: 'Size',
                toolbarDensityLabel: 'Size',
                toolbarDensityCompact: 'Small',
                toolbarDensityStandard: 'Medium',
                toolbarDensityComfortable: 'Large',
            }}
            // filterMode="server"
            // onFilterModelChange={handleFilterModelChange}
            {...rest}
        />
    );
}
export default withStyles(styles)(DataGridControl);