import React from 'react';
import {Head} from "@inertiajs/react";
import GuestLayout from '@/Layouts/GuestLayout';

const AuthDashboard = () => {
    return (
        <GuestLayout>
            <Head title={"Login"} />
            <div className="col-12">
                <div className="card">
                    <div className="grid">
                        <div className="col-6">
                            <img className={"w-full border-radius"} src="https://st4.depositphotos.com/14431644/22076/i/450/depositphotos_220767694-stock-photo-handwriting-text-writing-example-concept.jpg" alt=""/>
                        </div>
                        <div className="col-1">
                            <div className="p-divider p-component p-divider-vertical p-divider-solid p-divider-center"
                                 role="separator" data-pc-name="divider" data-pc-section="root">
                                <div className="p-divider-content" data-pc-section="content"></div>
                            </div>
                        </div>
                        <div className="col-5 align-items-center justify-content-center"><p>Sed ut perspiciatis unde
                            omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                            quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur,
                            adipisci velit, sed quia non numquam eius modi.</p>
                            <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-center"
                                 role="separator" data-pc-name="divider" data-pc-section="root">
                                <div className="p-divider-content" data-pc-section="content"><span
                                    className="p-tag">Badge</span></div>
                            </div>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                                voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
                                occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                                mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                                expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
                                nihil impedit quo minus.</p>
                            <div className="p-divider p-component p-divider-horizontal p-divider-solid p-divider-right"
                                 role="separator" data-pc-name="divider" data-pc-section="root">
                                <div className="p-divider-content" data-pc-section="content">
                                    <button aria-label="Button" className="p-button p-component p-button-outlined"
                                            data-pc-name="button" data-pc-section="root"><span
                                        className="p-button-icon p-c p-button-icon-left pi pi-search"
                                        data-pc-section="icon"></span><span className="p-button-label p-c"
                                                                            data-pc-section="label">Button</span>
                                    </button>
                                </div>
                            </div>
                            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
                                ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
                                tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur
                                aut perferendis doloribus asperiores repellat. Donec vel volutpat ipsum. Integer nunc
                                magna, posuere ut tincidunt eget, egestas vitae sapien. Morbi dapibus luctus odio.</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default AuthDashboard;
