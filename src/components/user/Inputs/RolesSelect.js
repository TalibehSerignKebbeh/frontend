import  FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { registerRoles } from '../../../config/allowedRoles';

const RolesSelect = ({ user, setuser }) => {
    const theme = useTheme()
    const handleChangeRoles = (event) => {
        const {
            target: { value },
        } = event;
        setuser({
            ...user,
            // On autofill we get a stringified value.
            roles: typeof value === 'string' ? value?.split(',') : value,
        });
    };
    function getStyles(role, roles, theme) {
        return {
            fontWeight:
                roles?.indexOf(role) === -1
                    ? theme?.typography?.fontWeightRegular
                    : theme?.typography?.fontWeightMedium,
        };
    }
    return (
        <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
            <label className='font-semibold text-lg -mb-1' htmlFor="roles-select'">Roles</label>
            <FormControl
                sx={{ width: '100%', border: '2px solid black' }}
                className={`rounded-lg bg-slate-50 dark:bg-slate-800 
                text-slate-800 dark:text-slate-50`}
            >
                <Select labelId='roles-select'
                    value={user?.roles ? user?.roles : []} multiple
                    onChange={handleChangeRoles}
                    name="roles" id='roles'
                    className='bg-slate-50 dark:bg-slate-800 
                text-slate-800 dark:text-slate-50
                     border-2 border-teal-300'
                    // input={<OutlinedInput label="roles" />}
                >
                    {registerRoles?.map((role, id) => (
                        <MenuItem value={role} key={role}
                            className='text-slate-700 dark:text-white
                                      bg-slate-50 dark:bg-slate-700'
                           >
                            {role}
                        </MenuItem>
                    ))}

                </Select>

            </FormControl>
        </div>
    );
}

export default RolesSelect;
