<?php
/*
 * Author: Raul Perusquia <raul@inikoo.com>
 * Created: Sat, 27 Jan 2024 19:26:03 Malaysia Time, Kuala Lumpur, Malaysia
 * Copyright (c) 2024, Raul A Perusquia Flores
 */

namespace App\Services;

class QueryBuilder extends \Spatie\QueryBuilder\QueryBuilder
{
    public function withPaginator($prefix = null): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $perPage = config('ui.table.records_per_page');

        $argumentName = ($prefix ? $prefix.'_' : '').'perPage';
        if (request()->has($argumentName)) {
            $inputtedPerPage = (int)request()->input($argumentName);

            if ($inputtedPerPage < 10) {
                $perPage = 10;
            } elseif ($inputtedPerPage > 1000) {
                $perPage = 1000;
            } else {
                $perPage = $inputtedPerPage;
            }
        }

        return $this->paginate(
            perPage: $perPage,
            pageName: $prefix ? $prefix.'Page' : 'page'
        );
    }
}