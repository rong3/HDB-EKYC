import React, { useState, useEffect } from 'react'
import { Typography, FormControl, Data, Button } from '@material-ui/core'
import DataGridControl from '../../shared/packages/control/grid/datagrid';
import { InputControl } from "../../shared/packages/control/input/inputControl"
import DateTimeInput from "../../shared/packages/control/input/datetime"
import FilterInputCustom from "../../shared/packages/control/grid/filter/inputFilter"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, UPDATE_USER } from "../../redux/actions/userActions"
import { useToasts } from "react-toast-notifications";
import mobileDetectHOC from "../../shared/packages/hocs/mobileDetect"
import { usePermission } from "../../shared/packages/provider/accessGateway"
import withPermission from "../../shared/packages/hocs/permission/permissionHOC"
import { loadDataTable, updateDataTable } from "../../redux/actions/fetchDataAction"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

function ExampleComponent(props) {
    const [allows] = usePermission();
    const { addToast } = useToasts();
    const { userInfo } = useSelector((state) => state.user);
    const { dataTable } = useSelector((state) => state.fetchData);
    const dispatch = useDispatch();
    const { classes } = props;
    const { t } = useTranslation('common');
    const [defaultUser, setDefaultUser] = useState(null);

    //HOOK
    useEffect(() => {
        //SAGA apply function
        if (dataTable.length === 0)
            dispatch(loadDataTable())
    }, [])

    /**REDUX AREA */
    const updateUserRedux = (field, value) => {
        dispatch(updateUser({ ...userInfo, [field]: value }))
    }

    const stateToast = (key, msg) => {
        if (key === 'success') {
            addToast(
                <div className='text-center'>
                    {msg}
                </div>, { appearance: 'success' });
        }
        if (key === 'error') {
            addToast(
                <div className='text-center'>
                    {msg}
                </div>, { appearance: 'error' });
        }
    }

    const updateUserSaga = (params) => {
        dispatch(updateDataTable({
            params: params,
            dataTable: dataTable,
            toastService: stateToast
        }));
    }

    const updateFullUserRedux = (value) => {
        dispatch(updateUser({ ...defaultUser }))
        addToast(
            <div className='text-center'>
                {"Successfuly update data"}
            </div>, { appearance: 'success' });
    }

    /** GRID UTILS*/

    const renderActionGrid = (params) => {
        return (
            <div className="box-action-container">
                <div>
                    <i className="fas fa-trash text-danger"></i>
                </div>
                <div>
                    <i className="fas fa-download text-success"></i>
                </div>
                <div>
                    <i className="fas fa-edit text-info"></i>
                </div>
            </div>
        )
    }

    const columns = [
        {
            field: 'name',
            headerName: t('examplePage.gridA.name'),
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
            filterOperators: [
                {
                    label: 'custom-filter',
                    value: 'phone',
                    getApplyFilterFn: (filterItem) => {
                        if (
                            !filterItem.columnField ||
                            !filterItem.value ||
                            !filterItem.operatorValue
                        ) {
                            return null;
                        }

                        return (params) => {
                            return Number(params.value) >= Number(filterItem.value);
                        };
                    },
                    InputComponent: FilterInputCustom,
                    InputComponentProps: { type: 'number' },
                },
            ]
        },
        {
            field: 'job',
            headerName: 'Job',
            headerClassName: 'headerColumn',
            flex: 1,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            headerClassName: 'headerColumn',
            sortable: false,
            flex: 2,
            editable: true
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            headerClassName: 'headerColumn',
            headerAlign: 'center',
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (cell) => {
                return renderActionGrid(cell)
            }
        },
    ];


    useEffect(() => {
        setDefaultUser({ ...userInfo });
    }, [])

    return (
        <div className={classes.root}>
            <div className="content">
                <div className="title-head clearfix">
                    <div className="col-sm-9 col-xs-7 no-padding">
                        <h6 className="flex-title">
                            <i className="title-text fas fa-laptop-code"></i>
                            <span className="title-text">
                                &nbsp;{t('examplePage.masterTitle')}
                            </span>
                        </h6>
                    </div>
                </div>

                <div className="block-content">
                    <div className="row row-title">
                        <div className="col-md-11">
                            <i className="far fa-eye"></i>
                            <span className="title-text">&nbsp;</span>
                            <span className="title-text">&nbsp;Control {props?.id}</span>
                        </div>
                    </div>
                    <FormControl className="block-input">
                        <div className="row">
                            <div className="col-md-3">
                                <span>Name:</span>
                                <InputControl type="text" id="name" onChange={(e) => {
                                    const value = e.target.value ?? '';
                                    defaultUser.name = value;
                                }} defaultValue={userInfo?.name} />
                            </div>

                            <div className="col-md-3">
                                <span>Phone:</span>
                                <InputControl type="phone" max={11} id="phone" onChange={(e) => {
                                    const value = e.target.value ?? '';
                                    defaultUser.phone = value;
                                }} defaultValue={userInfo?.phone} />
                            </div>

                            <div className="col-md-3">
                                <span>Job:</span>
                                <InputControl type="text" id="Job" onChange={(e) => {
                                    const value = e.target.value ?? '';
                                    defaultUser.job = value;
                                }} defaultValue={userInfo?.job} />
                            </div>

                            <div className="col-md-3">
                                <span>Email:</span>
                                <InputControl type="text" id="email" onChange={(e) => {
                                    const value = e.target.value ?? '';
                                    defaultUser.email = value;
                                }} defaultValue={userInfo?.email} />
                            </div>

                            <div className="col-md-3">
                                <span>Date:</span>
                                <DateTimeInput selected={new Date()} id="date" isOnlyDate={true} onChange={() => {
                                }} />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-3">
                                {
                                    allows('PERMISSION_CODE') &&
                                    <a className="btn btn-primary" onClick={() => {
                                        updateFullUserRedux()
                                    }}>UPDATE</a>
                                }
                            </div>
                        </div>
                    </FormControl>
                </div>
                {
                    props.isMobile ||
                    <div className="block-content">
                        <div className="row row-title">
                            <div className="col-md-12">
                                <i className="far fa-eye"></i>
                                <span className="title-text">&nbsp;ViewPort</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="card">
                                    <img className="card-img-top" style={{ height: '150px' }} src="/asset/image/logo-popup.png" alt="Card image" />
                                    <div className="card-body">
                                        <h4 className="card-title text-center">{userInfo?.name}</h4>
                                        <p className="card-text">Phone: {userInfo?.phone}</p>
                                        <p className="card-text">Job: {userInfo?.job}</p>
                                        <p className="card-text">Email: {userInfo?.email}</p>
                                        <a href="#" className="btn btn-primary">See Profile</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10">
                                {
                                    <DataGridControl
                                        rows={dataTable}
                                        columns={columns}
                                        count={dataTable.length}
                                        disableSelectionOnClick
                                        onCellEditCommit={(params) => {
                                            if (params.row[params.field] !== params.value)
                                                updateUserSaga(params)
                                        }}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

ExampleComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withPermission(mobileDetectHOC(withStyles(styles)(ExampleComponent)));