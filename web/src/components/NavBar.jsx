import { useState } from 'react';
import { MainNav, NavSection, NavSections, NavCondense, NavBrand, NavLink } from '@strapi/design-system/MainNav';
import { Layer, Pencil, User } from '@strapi/icons';
import { Divider } from '@strapi/design-system/Divider';
import strapiImage from '../assets/strapi.png';

export default function NavBar() {
    const [condensed, setCondensed] = useState(false);

    return (
        <MainNav condensed={condensed}>
            <NavBrand title="Quiz Admin" icon={<img src={strapiImage} alt="" />} />
            <Divider />
            <NavSections>
                <NavSection label="General">
                    <NavLink to="/exam" icon={<Pencil />}>
                        Exam
                    </NavLink>
                    <NavLink to="/examinee" icon={<User />}>
                        Examinee
                    </NavLink>
                </NavSection>

                <NavSection label="Manage">
                    <NavLink to="/builder" icon={<Layer />}>
                        Builder
                    </NavLink>
                </NavSection>
            </NavSections>
            <NavCondense onClick={() => setCondensed(s => !s)}>
                {condensed ? 'Expanded the navbar' : 'Collapse the navbar'}
            </NavCondense>
        </MainNav>
    );
}
