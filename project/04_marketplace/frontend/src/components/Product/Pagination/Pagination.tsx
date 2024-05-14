"use client";

import React from "react";
import { Pagination, Stack } from "@mui/material";

type Props = {
    page?: number;
    totalPage?: number;
    loading?: boolean;
    onChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const Paginate = function ({ page, loading, totalPage, onChange }: Props) {
    if (!loading) {
        return (
            <Stack spacing={2}>
                <Pagination
                    sx={{
                        ".MuiPaginationItem-page": {
                            fontSize: "1.4rem",
                        },
                    }}
                    size="medium"
                    count={totalPage}
                    shape="rounded"
                    page={page}
                    onChange={onChange}
                />
            </Stack>
        );
    }
};
export default Paginate;
