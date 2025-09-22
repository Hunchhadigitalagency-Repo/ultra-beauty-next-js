"use client";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { IContact } from "@/types/cms";
import { contactConstant } from "./contact-constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SingleContact from "./sigle-contack";

const ContactPage = () => {
    const scrollId = "infinite-scroll-container";
    const { data, loading, hasMore, fetchNext, totalCount } =
        useInfiniteFetch<IContact>("/cms/contactus/", "search");

    const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

    return (
        <main className="space-y-4 bg-white p-4">
            <PageHeader type="Contact" isSearch={false} totalItems={totalCount} />

            <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchNext}
                    hasMore={hasMore}
                    loader={<InfiniteScrollLoader />}
                    scrollableTarget={scrollId}
                >
                    <CustomTable<IContact>
                        cols={contactConstant()}
                        data={data as IContact[]}
                        loading={loading && data.length === 0}
                        onRowClick={(rowData: IContact) => setSelectedContact(rowData)}
                        height="h-auto"
                    />
                </InfiniteScroll>
            </div>

            {/* Generic Modal */}
            <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Contact Details</DialogTitle>
                    </DialogHeader>
                    {selectedContact && <SingleContact contact={selectedContact} />}
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default ContactPage;
