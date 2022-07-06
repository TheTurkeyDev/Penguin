import { NotFound } from '@theturkeydev/gobble-lib-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageWrapper } from './pages/base/page-wrapper';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProjectEdit } from './pages/project/project-edit';
import { ProjectOverview } from './pages/project/project-overview';

export const SiteRouter = () => (
    <Router>
        <PageWrapper>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/project/:projectId' element={<ProjectOverview />} />
                <Route path='/project/:projectId/edit' element={<ProjectEdit />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </PageWrapper>
    </Router>
);